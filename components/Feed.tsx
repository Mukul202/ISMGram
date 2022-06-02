import { useEffect, useState } from 'react'
import { RefreshIcon } from '@heroicons/react/outline'
import { Tweet } from '../typings'

const {
  BoxLoading,
  JumpCircleLoading,
  MeteorRainLoading,
  ThreeHorseLoading,
} = require('react-loadingg')


import dynamic from 'next/dynamic'
const TweetBox=dynamic(() => import("./TweetBox"),{
  ssr:false,
  loading: () => <JumpCircleLoading />
})
const TweetComponent = dynamic(() => import('../components/Tweet'), {
  loading:() => <JumpCircleLoading />,
  ssr: false,
})
// import TweetComponent from "../components/Tweet";
import { fetchTweets } from '../utils/fetchTweets';
import toast from 'react-hot-toast';
// import { useSession } from 'next-auth/react';
import { fetchTweetsLoggedOut } from '../utils/fetchTweetsLoggedOut';
// import { useSelector } from 'react-redux'
import Link from 'next/link'

// interface Props {
//   tweets: Tweet[]
//   setGlobalTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
//   // user:User
// }
// import { ReduxUserValue } from '../typings'
import { useAppSelector } from '../store/hooks'
// import loadable from '@loadable/component'

function Feed() {
  const user = useAppSelector((state) => state.user.user)

  const [tweets,setTweets]=useState<Tweet[]>([]);

  const handleRefresh = async () => {

    // if(!session){
    //   return ;
    // }

    const refreshToast = toast.loading('Refreshing...');

    let tweets:Tweet[];

    if(user?._id){
      tweets=await fetchTweets();
    }else{
      tweets=await fetchTweetsLoggedOut();
    }

    // const tweets = session?(await fetchTweets()).(await fetchTweetsLoggedOut());
    setTweets(tweets);
    // tweetsProp=tweets;

    toast.success('Feed Updated!', {
      id: refreshToast,
    })
  }

  useEffect(() => {
    handleRefresh();
    // console.log(user);
  },[user._id])

  return (
    <div className="col-span-7 max-h-screen overflow-scroll border-x scrollbar-hide lg:col-span-5">
      <div className="flex items-center justify-between">
        <Link href={'/'}>
          <h1 className="p-5 pb-0 text-xl font-bold cursor-pointer">Home</h1>
        </Link>
        <RefreshIcon
          onClick={handleRefresh}
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      {/* TweetBox */}
      <div>
        <TweetBox setTweets={setTweets} />
      </div>

      <div>
        {/* {
          refreshTweets()
        } */}
        {tweets.map((tweet) => {
          return <TweetComponent key={tweet._id} tweet={tweet} />
        })}
      </div>
    </div>
  )
}

export default Feed
