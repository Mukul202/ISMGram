import React, { lazy } from 'react'
import { useState } from 'react'

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

const SideBarRow = dynamic(() => import('./SideBarRow'), {
  loading: () => <JumpCircleLoading />,
  ssr: false,
})
// import SideBarRow from './SideBarRow'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
// import { useSelector } from 'react-redux';
import Image from 'next/image'
// import { ReduxUserValue, StoreUser } from '../typings';
import { useAppSelector } from '../store/hooks'
import dynamic from 'next/dynamic'

interface Props {
  src: string
  width: number
  // quality:number|undefined
}

const myLoader = ({ src, width }: Props, quality: number | undefined = 75) => {
  // const { src, width, quality } = props
  // console.log(props);
  // console.log('result %s', `${src}?w=${width}&h=${height}&q=${quality || 75}`);
  return `${src}?width=${width}&q=${quality || 75}`
}

function SideBar() {
  // const { data: session } = useSession()
  const user = useAppSelector((state) => state.user.user)
  const [responsiveNavState, setResponsiveNavState] = useState(false)

  const hamburgerHandler = () => {
    setResponsiveNavState((prev) => {
      return !prev
    })
  }

  // const {user}=useSelector<any>(state => state.user);
  // const user = useSelector<StoreUser>((state) => state.user.user) as ReduxUserValue
  // const [mounted, setMounted] = useState<boolean>(false)
  // console.log("booted");
  // useEffect(() => {
  //   console.log("booted");
  // },[]);

  // useEffect(() => setMounted(true), [])

  // if (!mounted) return null

  return (
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
      <div className="flex w-full justify-end items-center pr-2">
        <div
          onClick={user._id ? signOut : (signIn as any)}
          className="group flex max-w-fit cursor-pointer items-center space-x-2 rounded-full px-4 py-3 transition-all duration-200 hover:bg-gray-100"
        >
          <UserIcon className="h-6 w-6" />
          <p className="  font-light group-hover:text-twitter md:inline-flex text-xs">
            {user.email ? 'Sign Out' : 'Sign In'}
          </p>

        </div>

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
            responsiveNavState && user._id
              ? 'items-left absolute top-10 z-10 flex h-full w-1/2  flex-col  bg-white pl-3 pt-2 shadow-2xl'
              : 'hidden'
          }`}
        >
          {user._id && (
            <>
          <Link href={`/search/${user.username}`}>
            <span>
              <SideBarRow Icon={UserIcon} title="Profile" />
            </span>
          </Link>
          <SideBarRow Icon={HashtagIcon} title="Explore" />
          <SideBarRow Icon={BellIcon} title="Notifications" />
          <SideBarRow Icon={MailIcon} title="Messages" />
          <SideBarRow Icon={BookmarkIcon} title="Bookmarks" />
          <SideBarRow Icon={CollectionIcon} title="Lists" />
          </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SideBar
