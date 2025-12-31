import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true,
  },
  upload: true,
  labels: {
    singular: {
      en: 'Media',
      fr: 'Média',
    },
    plural: {
      en: 'Media',
      fr: 'Médias',
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      admin: {
        description: {
          en: 'Alt text for accessibility',
          fr: 'Texte alternatif pour l\'accessibilité',
        },
      },
    },
  ],
};

