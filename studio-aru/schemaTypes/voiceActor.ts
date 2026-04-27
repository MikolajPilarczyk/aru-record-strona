import {defineField, defineType} from 'sanity'

export const voiceActor = defineType({
  name: 'voiceAcotrs',
  title: 'Aktorzy Glosowi',
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
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nazwisko',
      type: 'string',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'specialization',
      type: 'string',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      title: 'Treść bloga',
      type: 'array',
      description: 'Tutaj możesz pisać tekst i dodawać obrazy pomiędzy akapitami.',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Tekst alternatywny',
              validation: (Rule) => Rule.required().error('Zdjęcie musi mieć tekst ALT dla SEO.'),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Podpis pod zdjęciem',
            },
          ],
        },
      ],
    }),
    //socjale
    defineField({
      name: 'socials',
      title: 'Profile w mediach społecznościowych',
      type: 'array',
      description: 'Wybierz platformę i podaj nazwę użytkownika',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platforma',
              type: 'string',
              options: {
                list: [
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'Discord', value: 'discord'},
                  {title: 'Pozostałe Sociaje', value: 'others'},
                ],
              },
            },
            {
              name: 'username',
              title: 'Nazwa użytkownika',
              type: 'string',
              description: 'Np. @nazwa_uzytkownika lub sam nick',
            },
            {
              name: 'url',
              title: 'Link do profilu',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'username',
              subtitle: 'platform',
            },
          },
        },
      ],
    }),

    //socjale

    defineField({
      name: 'demo',
      title: 'Dema Głosowe',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'audio/*',
          },
          // Opcjonalnie: możesz dodać pole opisu dla każdego pliku
          fields: [
            {
              name: 'description',
              type: 'string',
              title: 'Opis próbki',
            },
          ],
        },
      ],
    }),
  ],
})