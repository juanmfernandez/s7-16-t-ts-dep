import { prop, Ref, getModelForClass, pre, mongoose } from '@typegoose/typegoose';
import argon2 from 'argon2';
import { Cart } from '../cart/model';

@pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await argon2.hash(this.password);

    this.password = hash;

    return next();
  }
})
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true, default: "https://firebasestorage.googleapis.com/v0/b/c8t54pern.appspot.com/o/images%2Fprofilepics%2Fuser-profile-default.png?alt=media&token=5471edc9-7ce7-42e5-8c62-b70f05d7703f" })
  public photo!: string;

  @prop({ required: true })
  public documentType!: string;

  @prop({ required: true })
  public birthdate!: Date;

  @prop({ required: true })
  public genre!: string;

  @prop({ required: true, unique: true })
  public phNumber!: number;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true, unique: true })
  public dni!: number;

  @prop({ ref: () => Cart })
  public carts: Ref<Cart>[];

  public async comparePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
