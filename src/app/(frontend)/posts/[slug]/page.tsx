import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RichText } from '@/components/rich-text'

type Props = { params: Promise<{ slug: string }> }

async function PostView({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const post = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
  })

  if (!post.docs.length) {
    return null
  }

  const postData = post.docs[0]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">{postData.title}</h2>
      <RichText data={postData.content} />
    </div>
  )
}

export default PostView
