import React, { SVGProps } from 'react'

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) =>JSX. Element
  title: string
  // onClick?: () => {}
}

function SideBarRow({Icon,title}:Props) {
  return (
    <div className='flex max-w-fit cursor-pointer items-center space-x-2 px-1.5 py-3 rounded-full hover:bg-gray-100 transition-all duration-200 group'>
      <Icon className='h-6 w-6' />
      <p className='text-base font-light group-hover:text-twitter md:inline-flex lg:text-xl'>{title}</p>
    </div>
  )
}

export default React.memo(SideBarRow)