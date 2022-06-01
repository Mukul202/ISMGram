
export const fetchLikes = async (tweetId:string) => {
  const res= await fetch(`/api/getLikes?tweetId=${tweetId}`)
  const likes:string[] = await res.json();
  return likes
}