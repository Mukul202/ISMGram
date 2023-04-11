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
  tweets:Tweet[],
  email:string,
}

function username({ tweets,email}: Props) {
  // debugger;
  // console.log(tweets);
  return (
    <div className="col-span-7 max-h-screen overflow-scroll border-x scrollbar-hide lg:col-span-5 max-w-4xl items-center justify-around m-auto">
      <Head>
        {/* <title>{email}</title> */}
        <title>Liked Posts</title>
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
        {tweets.length>0 ?tweets.map((tweet) => {
          return <TweetComponent key={tweet._id} tweet={tweet} />
        }):<p>User hasn't liked any posts yet</p>}
      </div>
    </div>
  )
}

export default username

export const getStaticPaths= async () => {

  const query = `*[_type=="user" && !blockUser]{
    username,
    email
  }`
  const users=await sanityClient.fetch(query);
  // console.log(users);
  const usersFiltered=users.filter((user:User) => user.username!==null)
  const paths=usersFiltered.map((user:User) => ({
    params:{
      username:user.username as string,
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
  const query1 = `*[_type=="user" && !blockUser]{
    username,
    email
  }`
  const users=await sanityClient.fetch(query1);
  // console.log(users);
  const usersFiltered=users.filter((user:User) => user.username== params?.username)

  //on adding likes.include(&email) it is giving attribute error
  const query = `*[_type=="tweet" && $username in likes && !blockTweet]|order(_createdAt desc){
    _id,
    username,
    likes[]->{value},
    text,
    profileImg,
    image,
    _createdAt,
  }`
  const tweets=await sanityClient.fetch(query,{
    username:params?.username,
  });
  // if(!tweets?.[0]){
  //   return {
  //     notFound:true
  //   }
  // }
  return {
    props:{
      tweets,
      username:params?.username,
    },
    revalidate:60,
  }
}