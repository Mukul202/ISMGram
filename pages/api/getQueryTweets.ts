// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {sanityClient} from "../../sanity";
import { Tweet } from '../../typings';
import {groq} from 'next-sanity';

const feedQuery =groq`*[_type=="tweet" && !blockTweet && username==$userName]{
  _id,
  ...
} | order(_createdAt desc)`

type Data = {
  tweets: Tweet[]
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<Data>
) {

  const {userName}=req.query;

  const tweets:Tweet[] =await sanityClient.fetch(feedQuery,{
    userName
  });

  // console.log(tweets);
  res.status(200).json({tweets });
}
