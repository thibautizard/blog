import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      required: true,
    },
    {
      name: 'excerpt',
      type: 'text',
      required: false,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
