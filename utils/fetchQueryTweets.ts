import { Tweet } from "../typings";

export const fetchQueryTweets =async (userName:string) => {
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getQueryTweets?userName=${userName}`);
  const data =await res.json();
  const tweets:Tweet[] =data.tweets;
  return tweets;
}