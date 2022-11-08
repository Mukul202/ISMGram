import { SearchIcon } from '@heroicons/react/outline'
// import { useSession } from 'next-auth/react'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { InstagramEmbed, YouTubeEmbed } from 'react-social-media-embed'

// const InstagramEmbed = lazy(
//   () => import('react-social-media-embed/dist/components/embeds/InstagramEmbed')
// )
// const YouTubeEmbed = lazy(
//   () => import('react-social-media-embed/dist/components/embeds/YouTubeEmbed')
// )

// import { Tweet } from '../typings'
// import { fetchQueryTweets } from '../utils/fetchQueryTweets'

// import { BoxLoading } from 'react-loadingg';
// import { useSelector } from 'react-redux'
// import { StoreUser, ReduxUserValue } from '../typings'
import { useAppSelector } from '../store/hooks'
// import Link from 'next/link'

// interface Props {
//   setGlobalTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
//   // callback: (queryTweets: Tweet[]) => Promise<void>
// }

function Widgets() {

  // const {user}=useSelector<any>(state => state.user);
  // const user = useSelector<any>((state) => state.user.user)
  const user = useAppSelector((state) => state.user.user)

  // const {data:session} =useSession();

  const [input,setInput]=useState<string>('');

  // const [mounted,setMounted]=useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchingUser = toast.loading(`Searching Posts by ${input}`, {
      icon: '🔍',
    })

    location.assign(`/search/${input}`);

    // <Link href = />

    // const tweets:Tweet[]=await fetchQueryTweets(input);

    // console.log(tweets);

    // setGlobalTweets(tweets);
    // await callback(tweets);

    // console.log('hi')

    toast.success('Found the following result', {
      id: searchingUser,
      icon: '🤩',
    })
    setInput('');
  }

  // useEffect(() => setMounted(true),[]);

  // if(!mounted)return null;

  return (
    <div className="row-span-2 mt-2 hidden h-screen overflow-scroll px-2 scrollbar-hide lg:inline">
      {/* Search Box */}
      {/* <Link href={`/search/${input}`}> */}
      <div className="flex items-center space-x-2 rounded-full bg-gray-100 p-3">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <form onSubmit={handleSubmit}>
          <input
            disabled={!user?.email}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={
              user?.email ? 'Search Twitter by Name' : 'Login to Search'
            }
            className="flex-1 bg-transparent outline-none"
          />
          {/* <Link href={`/search/${input}`} replace> */}
          <button
            // onSubmit={handleSub}
            type="submit"
            disabled={!input || !user.email}
            className="hidden"
          ></button>
          {/* </Link> */}
        </form>
      </div>
      {/* </Link> */}
      {/* <TwitterTimelineEmbed
        sourceType="profile"
        screenName="md_ismd"
        options={{ height: 400 }}
      /> */}
      <div
        className="my-2 h-full w-full space-y-2 overflow-scroll
          py-2 scrollbar-hide"
      >
        {/* <Suspense fallback={<BoxLoading />}> */}
        <InstagramEmbed
          url="https://www.instagram.com/p/Cc8YS6lJOXg/"
          width={350}
          // height={400}
          // maxHeight={400}
        />
        {/* <FacebookEmbed
          url="https://www.facebook.com/MDiitism/posts/5293814844014390"
          width={300}
        /> */}
        <YouTubeEmbed
          url="https://www.youtube.com/watch?v=sK6MI_nBiTA"
          width={325}
        />
        {/* </Suspense> */}
      </div>
    </div>
  )
}

export default React.memo(Widgets)