// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {groq} from 'next-sanity';
import { sanityClient } from '../../sanity';
import { Comment, CommentBody } from '../../typings';

const commentQuery = groq`*[_type=="comment" && tweet._ref==$tweetId]{
  _id,
  _createdAt,
  comment,
  profileImg,
  username
} | order(_createdAt desc)
  `

type Data = Comment[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {tweetId} =req.query;

  const comments:Comment[] =await sanityClient.fetch(commentQuery,{tweetId})

  res.status(200).json(comments);
}
