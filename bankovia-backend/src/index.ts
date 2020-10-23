import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';
import UserClass from './classes/User';
const User = getModelForClass(UserClass);
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';

config();

const authorizedUsers = [
  '382368885267234816',
  '749008832683966595',
  '236279900728721409',
  '280404910980333580',
  '328354437552668672',
  '466443389873815553'
];

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  process.env.MONGODB_CONNECTION_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.error(err);
  }
);

app.listen(process.env.PORT, () =>
  console.log(
    `[LOG] App listening on port ${process.env.PORT}. | Library of Code sp-us | Bankovia API`
  )
);

app.post('/soft-pull', async (req, res) => {
  if (!req.headers.authorization)
    return res.status(401).send({
      code: 401,
      message: 'Request unauthorized.'
    });

  if (!req.body.userID)
    return res.status(400).send({
      code: 400,
      message: 'User ID missing.'
    });

  if (!(await User.exists({ pin: req.headers.authorization })))
    return res.status(403).send({
      code: 403,
      message: 'The server rejected the request. Invalid PIN.'
    });

  const requester = await User.findOne({ pin: req.headers.authorization })
    .lean()
    .exec();

  if (!authorizedUsers.includes(requester.userID))
    return res.status(403).send({
      code: 403,
      message: 'The server rejected the request. Unauthorized PIN.'
    });

  const user = await User.findOne({ userID: req.body.userID }).lean().exec();

  if (!user)
    return res.status(403).send({
      code: 403,
      message: 'The server rejected the request. Invalid user.'
    });

  if (!user.pin)
    return res.status(403).send({
      code: 403,
      message:
        'The server is unable to fulfil the request as the user has not authorized the Bankovia Development Team to query their score.'
    });

  try {
    const { data } = await axios({
      url: 'https://comm.libraryofcode.org/report/v2/soft',
      method: 'POST',
      data: {
        userID: user.userID,
        pin: Number(user.pin)
      },
      headers: {
        Authorization: process.env.VENDOR_AUTH_KEY
      }
    });

    return res.send(data);
  } catch {
    return res.status(500).send({
      code: 500,
      message: 'Unable to fetch user’s score at this time.'
    });
  }
});
