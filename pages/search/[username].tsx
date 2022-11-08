import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from 'react'
import TweetComponent from "../../components/Tweet";
import { sanityClient } from "../../sanity";
import { Tweet, User } from "../../typings";
import Image from 'next/image'

import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline'
const { JumpCircleLoading } = require('react-loadingg')
import { useAppSelector } from '../../store/hooks'
import { signIn, signOut } from 'next-auth/react'

import dynamic from 'next/dynamic'
import { serialize } from "v8";
// import React from 'react'

interface Props{
  tweets:Tweet[],
  username:string
}
const myLoader = ({ src, width }: Props, quality: number | undefined = 75) => {
  // const { src, width, quality } = props
  // console.log(props);
  // console.log('result %s', `${src}?w=${width}&h=${height}&q=${quality || 75}`);
  return `${src}?width=${width}&q=${quality || 75}`
}
const SideBarRow = dynamic(() => import('../../components/SideBarRow'), {
  loading: () => <JumpCircleLoading />,
  ssr: false,
})

function username({ tweets,username }: Props) {
  // debugger;
  // console.log(tweets);
  const user = useAppSelector((state) => state.user.user)

  const [responsiveNavState, setResponsiveNavState] = useState(false)

  const hamburgerHandler = () => {
    setResponsiveNavState((prev) => {
      return !prev
    })
  }


  return (
    <div className="col-span-7 max-h-screen overflow-scroll border-x scrollbar-hide lg:col-span-5 max-w-4xl items-center justify-around m-auto">
      <Head>
        <title>{username}</title>
      </Head>
      <div className="row-span-1 flex items-center shadow">
      <a href="https://mailer-daemon.vercel.app" target={'_blank'}>
        <Image
          loader={myLoader}
          className="mt-4 ml-4 mb-2 h-8 w-8"
          src="/md.jpg"
          alt="MD logo"
          width={30}
          height={30}
          layout="raw"
          priority
        />
      </a>
      
      <div className="flex w-full items-center">
      <div className="flex items-center justify-center w-4/5 pl-2 mr-1 cursor-pointer font-bold text-base">{username}</div>
      <div className="flex w-1/5 justify-end items-center">
        <div className="flex justify-between p-2">
          <div
            onClick={hamburgerHandler}
            className="text-300 top-1 block cursor-pointer "
          >
            <SideBarRow Icon={DotsCircleHorizontalIcon} title="" /> 
          </div>
        </div>
        <div
          className={`${
            responsiveNavState
              ? 'items-left absolute top-10 z-10 flex h-full w-1/2  flex-col  bg-white pl-3 pt-2 shadow-2xl'
              : 'hidden'
          }`}
        >
          
          <Link href={`/search/${user.username}`}>
            <span>
              <SideBarRow Icon={UserIcon} title="Profile" />
            </span>
          </Link>
          <Link href={`/`}>
            <span>
              <SideBarRow Icon={HashtagIcon} title="Explore" />
            </span>
          </Link>
          <SideBarRow Icon={BellIcon} title="Notifications" />
          <SideBarRow Icon={MailIcon} title="Messages" />
          <SideBarRow Icon={BookmarkIcon} title="Bookmarks" />
          <SideBarRow Icon={CollectionIcon} title="Lists" />
        
        </div>
        </div>
      </div>
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
        }):<p>User hasn't posted anything yet</p>}
      </div>
    </div>
  )
}

export default username

export const getStaticPaths= async () => {

  const query = `*[_type=="user" && !blockUser]{
    username
  }`
  const users=await sanityClient.fetch(query);
  // console.log(users);
  const usersFiltered=users.filter((user:User) => user.username!==null)
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
      username:params?.username
    },
    revalidate:60,
  }
}