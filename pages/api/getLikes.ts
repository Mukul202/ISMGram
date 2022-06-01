// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {groq} from 'next-sanity';
import { sanityClient } from '../../sanity';

const likeQuery = groq`*[_type=="tweet" && _id==$tweetId][0]{
  likes
}
  `

type Data = string[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {tweetId} =req.query;

  const likes:string[] =(await sanityClient.fetch(likeQuery,{tweetId})).likes;

  res.status(200).json(likes);
}
