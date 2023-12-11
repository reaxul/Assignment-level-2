import { Schema, model } from 'mongoose';
import { User } from './user.interface';
import bcrypt from "bcrypt";

const userSchema = new Schema<User>({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    hobbies: {
        type: [String],
        required: true,
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    orders: [
        {
          productName: { type: String },
          price: { type: Number },
          quantity: { type: Number },
        },
      ],
})

userSchema.pre("save", function (next) {
    const hashPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashPassword;
    next();
  });
  userSchema.set("toJSON", {
    transform: function (doc, ret) {
      delete ret.password;
    },
  });

export const UserModel = model<User>('User', userSchema);