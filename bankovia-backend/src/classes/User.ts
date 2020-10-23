import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  options: { allowMixed: 0 },
  schemaOptions: { collection: 'accounts' }
})
class User {
  @prop()
  userID: string;

  @prop()
  gemFragments: number;

  @prop()
  rubies: number;

  @prop()
  elixirs: number;

  @prop()
  crystals: number;

  @prop()
  vendor?: {
    /* Stuff Here*/
  };

  @prop()
  type: 0 | 1;

  @prop()
  daily?: {
    cooldown: number;
    streakTimeout: number;
    dailyStreak: number;
  };

  @prop()
  rep: {
    cooldown?: number;
    total: number;
  };

  @prop()
  steal: {
    stolenFromAmount: number;
    stolenFromUser: number;
    shieldType?: string;
    hasShield: boolean;
    shieldTimeout?: number;
  };

  @prop()
  pin?: string;
}

export default User;
