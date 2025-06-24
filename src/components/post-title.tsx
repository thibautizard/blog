import React from 'react'

type Props = {
  title: string
}

function PostTitle({ title }: Props) {
  return (
    <h2 className="text-3xl transition-all duration-500 font-black mb-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent hover:from-blue-700 hover:via-blue-600 hover:to-blue-800">
      {title}
    </h2>
  )
}

export default PostTitle
