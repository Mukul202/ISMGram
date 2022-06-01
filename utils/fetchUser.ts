import { User } from "../typings";

export const fetchUser = async (userId:string) => {
  // console.log(tweetId);
  const res= await fetch(`/api/getUser?userId=${userId}`)
  const user:User = await res.json();
  return user
}