import { Tweet } from "../typings";

export const fetchTweetsLoggedOut =async () => {
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweetsLoggedOut`);
  const data =await res.json();
  const tweets:Tweet[] =data.tweets;
  return tweets;
}