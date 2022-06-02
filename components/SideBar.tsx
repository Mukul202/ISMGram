import React, { lazy } from 'react'

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

const {JumpCircleLoading}=require("react-loadingg")

const SideBarRow = dynamic(() => import('./SideBarRow'),{
  loading:() => <JumpCircleLoading />,
  ssr:false
});
// import SideBarRow from './SideBarRow'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
// import { useSelector } from 'react-redux';
import Image from 'next/image';
// import { ReduxUserValue, StoreUser } from '../typings';
import { useAppSelector } from '../store/hooks';
import dynamic from 'next/dynamic';

interface Props{
  src:string,
  width:number,
  // quality:number|undefined
}

const myLoader = ({ src, width}:Props,quality:number|undefined=75) => {
  // const { src, width, quality } = props
  // console.log(props);
  // console.log('result %s', `${src}?w=${width}&h=${height}&q=${quality || 75}`);
  return `${src}?width=${width}&q=${quality || 75}`
}

function SideBar() {
  // const { data: session } = useSession()
    const user = useAppSelector((state) => state.user.user)

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
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <a href="https://mailer-daemon.vercel.app" target={'_blank'}>
        <Image
          loader={myLoader}
          className="m-3 h-10 w-10 cursor-pointer"
          src="/md.jpg"
          alt="MD logo"
          width={40}
          height={40}
          layout='raw'
          priority
        />
      </a>
      {user._id && (
        <div>
          <Link href={`/search/${user.username}`}>
            <span><SideBarRow Icon={HomeIcon} title="Profile" /></span>
          </Link>
          <SideBarRow Icon={HashtagIcon} title="Explore" />
          <SideBarRow Icon={BellIcon} title="Notifications" />
          <SideBarRow Icon={MailIcon} title="Messages" />
          <SideBarRow Icon={BookmarkIcon} title="Bookmarks" />
          <SideBarRow Icon={CollectionIcon} title="Lists" />
        </div>
      )}
      <div
        onClick={user._id ? signOut : signIn as any}
        className="group flex max-w-fit cursor-pointer items-center space-x-2 rounded-full px-4 py-3 transition-all duration-200 hover:bg-gray-100"
      >
        {/* <SideBarRow */}
        {/* // onClick={session ? signOut : signIn} */}
        {/* Icon={UserIcon} */}
        <UserIcon className="h-6 w-6" />
        {/* title={session ? 'Sign Out' : 'Sign In'} */}
        <p className="hidden text-base font-light group-hover:text-twitter md:inline-flex lg:text-xl">
          {user.email ? 'Sign Out' : 'Sign In'}
        </p>

        {/* /> */}
      </div>

      <SideBarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  )
}

export default SideBar;
