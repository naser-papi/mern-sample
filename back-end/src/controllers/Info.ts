import express from "express";
import Info, { IInfoSchema } from "../models/Info";

import { IDoc } from "../models/GlobalTypes";

export const addInfo = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new Error("please set required infos"));
    return;
  }
  const info = (await Info.find({ email: email })) as IDoc<IInfoSchema>[];
  if (info && info.length) {
    //exist
    next(new Error("this email is exist!!!"));
    return;
  }
  const newInfo = new Info({
    email,
    password
  });

  const savedInfo = await newInfo.save();

  res.status(200).json(savedInfo);
};

export const getInfoList = async (req: express.Request, res: express.Response) => {
  const posts = await Info.find();
  res.status(200).json(posts);
};
//
export const updateInfo = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id } = req.params;
  const { email, password } = req.body;
  if (!email || !password) next(new Error("invalid data for update"));
  const info = (await Info.findById(id)) as IDoc<IInfoSchema>;
  if (!info) next(new Error("invalid post id"));

  const exist = (await Info.find({ email: email })) as IDoc<IInfoSchema>[];
  if (exist && exist.length) {
    //exist
    next(new Error("this email is exist!!!"));
    return;
  }
  const updatedInfo = await Info.findByIdAndUpdate(id, { email, password }, { new: true });

  return res.status(200).json(updatedInfo);
};
