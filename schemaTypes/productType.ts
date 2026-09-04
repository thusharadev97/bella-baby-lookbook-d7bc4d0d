import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Product Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'price', title: 'Price', type: 'number' }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{type: 'image'}] }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}] })
  ]
})
