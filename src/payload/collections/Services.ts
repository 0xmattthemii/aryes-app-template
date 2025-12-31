import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category'],
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      en: 'Service',
      fr: 'Service',
    },
    plural: {
      en: 'Services',
      fr: 'Services',
    },
  },
  fields: [
    {
      name: 'title',
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
          en: 'URL slug for the service page (e.g., technology-strategy)',
          fr: 'Slug URL pour la page de service (ex. technology-strategy)',
        },
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'service-categories',
      required: true,
      admin: {
        description: {
          en: 'Service category for grouping in navigation',
          fr: 'Catégorie de service pour le regroupement dans la navigation',
        },
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
      admin: {
        description: {
          en: 'Brief description shown in navigation menus',
          fr: 'Brève description affichée dans les menus de navigation',
        },
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: {
          en: 'Optional image for service pages',
          fr: 'Image optionnelle pour les pages de service',
        },
      },
    },
  ],
};
