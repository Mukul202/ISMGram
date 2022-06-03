import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
import TweetComponent from '../../components/Tweet'
import { sanityClient } from '../../sanity'
import { Tweet, User } from '../../typings'

// import React from 'react'

interface Props {
  tweets: Tweet[]
  // username: string
  title:string
}

function username({ tweets,title}: Props) {
  // debugger;
  // console.log(tweets);

  return (
    <div className="col-span-7 m-auto max-h-screen max-w-4xl items-center justify-around overflow-scroll border-x scrollbar-hide lg:col-span-5">
      <Head>
        <title>{tweets[0]?.text || 'Not Found'}</title>
      </Head>
      <div className="flex items-center justify-center">
        <Link href={'/'}>
          <h1 className="cursor-pointer p-5 pb-0 text-xl font-bold">Home</h1>
        </Link>
        {/* <RefreshIcon
            onClick={handleRefresh}
            className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
          /> */}
      </div>

      {/* TweetBox */}
      {/* <div>
          <TweetBox setTweets={setTweets} />
        </div> */}

      <div>
        {/* {
          refreshTweets()
        } */}
        {tweets.length > 0 ? (
          tweets.map((tweet) => {
            return <TweetComponent key={tweet._id} tweet={tweet} />
          })
        ) : (
          <p>No such post</p>
        )}
      </div>
    </div>
  )
}

export default username

export const getStaticPaths = async () => {
  const query = `*[_type=="tweet" && !blockTweet]{
    _id,
    username,
    text
  }`
  const users = await sanityClient.fetch(query)
  // console.log(users);
  const usersFiltered = users.filter((tweet: Tweet) => tweet.username !== null)
  const paths = usersFiltered.map((tweet: Tweet) => ({
    params: {
      // username: tweet.username as string,
      postId:tweet._id,
      title:tweet.text,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const {user}=useSelector<any>(state => state.user);
  // console.log(user);
  // if(user.username!==params?.username){
  //   return {
  //     notFound:true
  //   }
  // }
  const query = `*[_type=="tweet" && _id==$postId && !blockTweet]{
    _id,
    username,
    likes,
    text,
    profileImg,
    image,
    _createdAt,
  }`
  const tweets = await sanityClient.fetch(query, {
    postId: params?.postId,
  })
  // if(!tweets?.[0]){
  //   return {
  //     notFound:true
  //   }
  // }
  return {
    props: {
      tweets,
      // username: params?.username,
      title:params?.title || null
    },
    revalidate: 60,
  }
}
