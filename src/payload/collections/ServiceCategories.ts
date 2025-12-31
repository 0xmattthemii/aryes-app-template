import type { CollectionConfig } from 'payload';

export const ServiceCategories: CollectionConfig = {
  slug: 'service-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      en: 'Service Category',
      fr: 'Catégorie de service',
    },
    plural: {
      en: 'Service Categories',
      fr: 'Catégories de services',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: {
          en: 'Category name (e.g., "Technology", "Corporate Finance")',
          fr: 'Nom de la catégorie (ex. "Technologie", "Finance d\'entreprise")',
        },
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: {
          en: 'URL-friendly identifier (e.g., "technology", "corporate-finance")',
          fr: 'Identifiant convivial pour l\'URL (ex. "technology", "corporate-finance")',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: {
          en: 'Optional description of this category',
          fr: 'Description optionnelle de cette catégorie',
        },
      },
    },
  ],
};

