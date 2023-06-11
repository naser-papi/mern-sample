import express from "express";
import Info, { IInfoSchema } from "../models/Info";

//import {IDoc} from "../models/GlobalTypes";

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
  //TODO:: don't use any here
  const info = (await Info.find({ email: email })) as any;
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

export const getInfo = async (req: express.Request, res: express.Response) => {
  const posts = await Info.find();
  res.status(200).json(posts);
};
//
// export const updateInfo = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   const { id } = req.params;
//   const { userId } = req.body;
//   if (!userId) next(new Error("invalid user id"));
//   const post = (await Post.findById(id)) as IDoc<IPostSchema>;
//   if (!post) next(new Error("invalid post id"));
//
//   const isLiked = post.likes.get(userId);
//   if (isLiked) {
//     post.likes.delete(userId);
//   } else {
//     post.likes.set(userId, true);
//   }
//
//   const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });
//
//   return res.status(200).json(updatedPost);
// };
