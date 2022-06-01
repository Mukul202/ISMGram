// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {groq} from 'next-sanity';
import { sanityClient } from '../../sanity';
import {  User } from '../../typings';

const userQuery = groq`*[_type=="user" && email==$userId && !blockUser][0]{
  _id,
  email,
  profileImg,
  username
}
  `

type Data = User;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {userId} =req.query;

  const user:User =await sanityClient.fetch(userQuery,{userId})

  res.status(200).json(user);
}
