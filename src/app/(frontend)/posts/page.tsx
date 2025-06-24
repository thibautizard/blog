import React from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import '../global.css'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RichText } from '@/components/rich-text'
import Link from 'next/link'
import PostTitle from '@/components/post-title'

const PostPreview = ({
  title,
  excerpt,
  slug,
  createdAt,
}: {
  title: string
  slug: string
  createdAt: string
  excerpt?: string | null
}) => (
  <div className="hover:scale-101 transition-all duration-500 cursor-pointer">
    <Link href={`/posts/${slug}`}>
      <PostTitle title={title} />
      <p className="text-sm text-gray-500 mb-2">
        {new Date(createdAt).toLocaleDateString('fr-FR', {
          dateStyle: 'long',
        })}
      </p>
      {excerpt && <p className="text-base mb-2">{excerpt}</p>}
    </Link>
  </div>
)

export default async function HomePage() {
  const payload = await getPayload({ config })
  const posts = await payload.find({ collection: 'posts', where: { published: { equals: true } } })

  if (posts.totalDocs === 0) return null

  const PostsList = posts.docs.map((post) => (
    <PostPreview
      key={post.id}
      title={post.title}
      slug={post.slug}
      createdAt={post.createdAt}
      excerpt={post.excerpt}
    />
  ))

  return PostsList
}
