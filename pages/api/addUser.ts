// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserBody } from '../../typings'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const data:UserBody=JSON.parse(req.body);

  const mutations={
    mutations:[
      {
        create:{
          _type:'user',
          username:data.username,
          blockUser:false,
          email:data.email,
          profileImg:data.profileImg,
          tweets:[],
          savedTweets:[],
          likedTweets:[],
        }
      }
    ]
  }
  const apiEndpoint=`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
  
  const result=await fetch(apiEndpoint,{
    headers:{
      'content-type':'application/json',
      Authorization:`Bearer ${process.env.SANITY_API_TOKEN}`
    },
    body:JSON.stringify(mutations),
    method:'POST'
  })

  // console.log("User Added!");

  const json=await result.json();

  console.log(json);

  res.status(200).json({ message:'Added!' })
}
