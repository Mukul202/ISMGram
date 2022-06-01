import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
// import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Suspense, useEffect, useState,lazy } from 'react'
import { Toaster } from 'react-hot-toast'

const loadable =require('@loadable/component/dist/loadable.cjs.js')

// const Feed = dynamic(() => import('../components/Feed'), {
//   suspense: true,
//   loading: <MeteorRainLoading />,
// })
const Feed =loadable(() => import('../components/Feed'),{
  fallback:<BoxLoading />,
  ssr:false
})
const SideBar=loadable(() => import('../components/SideBar'),{
  fallback:<BoxLoading />,
  ssr:false
})
// const Widgets = dynamic(() => import('../components/Widgets'), {
//   suspense: true,
//   loading: <ThreeHorseLoading />,
// })
const Widgets=loadable(() => import('../components/Widgets'),{
  fallback:<BoxLoading />,
  ssr:false
});


import { ReduxUserValue, StoreUser, Tweet, User, UserBody } from '../typings'
import { fetchTweetsLoggedOut } from '../utils/fetchTweetsLoggedOut'
import { fetchUser } from '../utils/fetchUser'

import {
  BoxLoading,
  JumpCircleLoading,
  MeteorRainLoading,
  ThreeHorseLoading,
} from 'react-loadingg'

import { userActions } from '../store/user'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  tweets:Tweet[]
}

// const context=createContext();

const Home: NextPage = ({tweets}: Props) => {
  // console.log(tweets);

  const {data:session} =useSession();

  // const userRedux=useSelector<any>(state => state.user);
  // const user=userRedux['user'];

  const user = useSelector<StoreUser>((state) => state.user.user) as ReduxUserValue


  const dispatch=useDispatch();

  const [changed,setChanged]=useState<boolean>(false);

  // const [user,setUser]=useState<User|null>(null);

  const addUser = async () => {

    if(!session){
      return;
    }

    // console.log(user);

    if(user?._id){
      return ;
    }

    const userInfo=session?.user?.email as string;

    let prevUser:User=await fetchUser(userInfo);

    // let prevUser:(User|null)=prevUserArray.length?prevUserArray[0]:null;

    
    if(!prevUser?._id){
      const result =await fetch(`/api/addUser`,{
        body:JSON.stringify(userInfo),
        method:'POST',
      })
      const json =result.json();
      
      prevUser = await fetchUser(userInfo)
      
      await dispatch(userActions.login(prevUser))
      
      console.log(json);
    }else{
      await dispatch(userActions.login(prevUser));
    }


    // const updatedTweets:Tweet[]=await fetchTweets();
    // setGlobalTweets(updatedTweets);
  }

  
  // const [globalTweets,setGlobalTweets]=useState<Tweet[]>(tweets);
  
  useEffect(() => {
    // console.log('Updated!');
    const userData= setTimeout( async () => {
      // const userEmail=session?.user?.email;
      // const userAdded=await fetchUser(userEmail);
      // dispatch(userActions.login(userAdded));
      if(session?.user){
        await addUser();
        // userData();
      }else{
        dispatch(userActions.logout());
      }
    },2000);
    setChanged(!changed)
    return () => {
      clearTimeout(userData);
    }
  },[session?.user?.email])

  return (
    <div className="lg:max-w-9xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <div className="grid grid-cols-9">
        {/* <Suspense fallback={<JumpCircleLoading />}> */}
          {/* {
            // console.log(user)
          } */}
          <SideBar changed={changed} />
        {/* </Suspense> */}
        {/* <Suspense fallback={<JumpCircleLoading />}> */}
          <Feed
          // tweets={globalTweets}
          // setGlobalTweets={setGlobalTweets}
          />
        {/* </Suspense> */}
        {/* <Suspense fallback={<JumpCircleLoading />}> */}
          <Widgets changed={changed} />
        {/* </Suspense> */}
      </div>
    </div>
  )
}
 
export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {

  // console.log(context);
  
  const tweets:Tweet[]=await fetchTweetsLoggedOut();


  return {
    props :{
      tweets,
    }
  }
}