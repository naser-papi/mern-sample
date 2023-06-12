import mongoose from "mongoose";

export interface IInfoSchema {
  email: string;
  password: string;
}

const InfoSchema = new mongoose.Schema<IInfoSchema>(
  {
    email: {
      type: String,
      required: true
    },
    password: String
  },
  { timestamps: true }
);

InfoSchema.set("toJSON", {
  virtuals: true
});

export const Info = mongoose.model("Info", InfoSchema);

export default Info;
