import {defineField, defineType} from 'sanity'

export const partnerVoiceAcotrs = defineType({
  name: 'partnerVoiceAcotrs',
  title: 'Partnerzy',
  type: 'document',
  fields: [
    defineField({
      name: 'imie',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ksywka',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nazwisko',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
})