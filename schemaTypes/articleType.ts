import {defineField, defineType} from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article / Lookbook',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Article Title', 
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({ 
      name: 'slug', 
      title: 'Slug', 
      type: 'slug', 
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({ 
      name: 'mainImage', 
      title: 'Featured Image', 
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({ 
      name: 'keywords', 
      title: 'Keywords / Tags', 
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }),
    defineField({ 
      name: 'author', 
      title: 'Author', 
      type: 'string' 
    }),
    defineField({ 
      name: 'publishedAt', 
      title: 'Published At', 
      type: 'datetime' 
    }),
    defineField({ 
      name: 'body', 
      title: 'Article Body', 
      type: 'array',
      of: [
        { type: 'block' },
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' }
          ]
        }
      ]
    })
  ]
})
