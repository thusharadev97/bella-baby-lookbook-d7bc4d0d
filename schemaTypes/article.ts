import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Articles & Editorial',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: "Women's Fashion & Style", value: 'womens-style' },
          { title: 'Beauty & Botanical Skincare', value: 'beauty-skincare' },
          { title: 'Baby & Toddler Essentials', value: 'baby-toddler' },
          { title: 'Maternity & Mom Style', value: 'maternity-mom' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Article Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt (SEO Summary)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'authorName',
      title: 'Contributor Name',
      type: 'string',
    }),
  ],
})
