import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Category Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' })
  ]
})
