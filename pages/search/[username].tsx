import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
import TweetComponent from "../../components/Tweet";
import { sanityClient } from "../../sanity";
import { Tweet, User } from "../../typings";

// import React from 'react'

interface Props{
  tweets:Tweet[]
}

function username({ tweets }: Props) {
  // debugger;
  // console.log(tweets);

  return (
    <div className="col-span-7 max-h-screen overflow-scroll border-x scrollbar-hide lg:col-span-5 max-w-4xl items-center justify-around m-auto">
      <Head>
        <title>{tweets[0].username}</title>
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
        {tweets.map((tweet) => {
          return <TweetComponent key={tweet._id} tweet={tweet} />
        })}
      </div>
    </div>
  )
}

export default username

export const getStaticPaths= async () => {

  const query = `*[_type=="user"]{
    _id,
    username
  }`
  const users=await sanityClient.fetch(query);
  // console.log(users);
  const usersFiltered=users.filter((user:User) => user!==null)
  const paths=usersFiltered.map((user:User) => ({
    params:{
      username:user.username as string
    },
  }))
  return {
    paths,
    fallback:'blocking'
  }
}

export const getStaticProps:GetStaticProps = async ({params}) => {
  // const {user}=useSelector<any>(state => state.user);
  // console.log(user);
  // if(user.username!==params?.username){
  //   return {
  //     notFound:true
  //   }
  // }
  const query = `*[_type=="tweet" && username==$username && !blockTweet]|order(_createdAt desc){
    _id,
    username,
    likes,
    text,
    profileImg,
    image,
    _createdAt,
    'comments':*[_type=="comment" && tweet._ref==^._id],
  }`
  const tweets=await sanityClient.fetch(query,{
    username:params?.username,
  });
  if(!tweets?.[0]){
    return {
      notFound:true
    }
  }
  return {
    props:{
      tweets,
    },
    revalidate:60,
  }
}