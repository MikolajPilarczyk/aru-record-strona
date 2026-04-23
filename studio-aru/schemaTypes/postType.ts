import {defineField, defineType} from 'sanity'
import {defineConfig} from 'sanity'
import {muxInput} from 'sanity-plugin-mux-input'


export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
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
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'videoToUpLoad',
      title: 'Plik wideo (Mux)',
      type: 'mux.video',
    }),
    defineField({
      name: 'nativeVideo',
      title: 'Plik wideo (nie Mux) GŁÓWNE POLE DO WRZUCANIA FILMÓW',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'body',
      title: 'opis pod filmem',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'tags',
      title: 'Tagi',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (Rule: any) => Rule.unique(),
    }),
    defineField({
      name: 'cast',
      title: 'Obsada i Role',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'castMember',
          title: 'Członek obsady',
          fields: [
            {
              name: 'actor',
              title: 'Aktor',
              type: 'reference',
              to: [{type: 'voiceAcotrs'}],
            },
            {
              name: 'characterName',
              title: 'Rola / Nazwa postaci',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'actor.ksywka',
              subtitle: 'characterName',
              media: 'actor.image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'techCast',
      title: 'Obsada techniczna',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'castMember',
          title: 'Członek obsady',
          fields: [
            {
              name: 'actor',
              title: 'Aktor',
              type: 'reference',
              to: [{type: 'voiceAcotrs'}],
            },
            {
              name: 'characterName',
              title: 'Nazwa roli techniczej',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'actor.name',
              subtitle: 'characterName',
              media: 'actor.image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'partnerCast',
      title: 'Partner cast',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'castMember',
          title: 'Partnerski członek obsady',
          fields: [
            {
              name: 'actor',
              title: 'Aktor',
              type: 'reference',
              to: [{type: 'partnerVoiceAcotrs'}],
            },
            {
              name: 'characterName',
              title: 'Nazwa roli techniczej',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'actor.ksywka',
              subtitle: 'characterName',
              media: 'actor.photo',
            },
          },
        },
      ],
    }),
  ],
})