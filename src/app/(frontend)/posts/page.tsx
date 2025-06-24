import React from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import '../global.css'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RichText } from '@/components/rich-text'
import Link from 'next/link'

const PostPreview = ({
  title,
  content,
  slug,
  createdAt,
}: {
  title: string
  slug: string
  createdAt: string
  content?: SerializedEditorState | null
}) => (
  <div>
    <h2 className="text-2xl font-semibold mb-2">
      <Link href={`/posts/${slug}`}>{title}</Link>
    </h2>
    <p className="text-sm text-gray-500 mb-2">
      {new Date(createdAt).toLocaleDateString('fr-FR', {
        dateStyle: 'long',
      })}
    </p>
    {content && <RichText data={content} />}
  </div>
)

export default async function HomePage() {
  const payload = await getPayload({ config })
  const posts = await payload.find({ collection: 'posts' })

  if (posts.totalDocs === 0) return null

  const PostsList = posts.docs.map((post) => (
    <PostPreview
      key={post.id}
      title={post.title}
      slug={post.slug}
      createdAt={post.createdAt}
      content={post.content}
    />
  ))

  return PostsList
}
