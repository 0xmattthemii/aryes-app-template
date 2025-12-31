import type { CollectionConfig } from 'payload';

export const Industries: CollectionConfig = {
  slug: 'industries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      en: 'Industry',
      fr: 'Industrie',
    },
    plural: {
      en: 'Industries',
      fr: 'Industries',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: {
          en: 'URL slug for the industry page (e.g., fintech)',
          fr: 'Slug URL pour la page d\'industrie (ex. fintech)',
        },
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: {
          en: 'Optional image for industry pages',
          fr: 'Image optionnelle pour les pages d\'industrie',
        },
      },
    },
  ],
};
