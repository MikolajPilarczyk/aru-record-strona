import {defineField, defineType} from 'sanity'

export const video = defineType({
  name: 'video',
  title: 'Filmy z YT',
  type: 'document',
  fields: [
    defineField({
      name: 'videoID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thumbnailsUrl',
      type: 'url',
    }),
  ],
})