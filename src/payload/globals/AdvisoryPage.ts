import type { GlobalConfig } from 'payload';
import { PageHeaderFields } from '../field-groups/PageHeaderFields';
import { CTASectionFields } from '../field-groups/CTASectionFields';

export const AdvisoryPage: GlobalConfig = {
  slug: 'advisory-page',
  label: {
    en: 'Advisory Page',
    fr: 'Page Conseil',
  },
  admin: {
    description: {
      en: 'Configure Advisory page content',
      fr: 'Configurer le contenu de la page Conseil',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'pageHeader',
      type: 'group',
      label: {
        en: 'Page Header',
        fr: 'En-tête de page',
      },
      fields: PageHeaderFields,
    },
    {
      name: 'introSection',
      type: 'group',
      label: {
        en: 'Intro Section',
        fr: 'Section d\'introduction',
      },
      fields: [
        {
          name: 'title',
          type: 'richText',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'practiceAreas',
      type: 'array',
      label: {
        en: 'Practice Areas',
        fr: 'Domaines de pratique',
      },
      minRows: 2,
      maxRows: 2,
      admin: {
        description: {
          en: 'Select service categories to display as practice areas. Services will be automatically filtered by category.',
          fr: 'Sélectionner les catégories de services à afficher comme domaines de pratique. Les services seront automatiquement filtrés par catégorie.',
        },
      },
      fields: [
        {
          name: 'practiceNumber',
          type: 'text',
          required: true,
          defaultValue: 'Practice 01',
          admin: {
            description: {
              en: 'Practice number label (e.g., "Practice 01", "Practice 02")',
              fr: 'Libellé du numéro de pratique (ex. "Pratique 01", "Pratique 02")',
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
              en: 'Select the service category for this practice area',
              fr: 'Sélectionner la catégorie de service pour ce domaine de pratique',
            },
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
          admin: {
            description: {
              en: 'Optional description text for this practice area',
              fr: 'Texte de description optionnel pour ce domaine de pratique',
            },
          },
        },
        {
          name: 'services',
          type: 'relationship',
          relationTo: 'services',
          hasMany: true,
          required: false,
          admin: {
            description: {
              en: 'Select specific services to display. Only services from the selected category will be shown.',
              fr: 'Sélectionner les services spécifiques à afficher. Seuls les services de la catégorie sélectionnée seront affichés.',
            }
          },
          filterOptions: ({ data, siblingData }) => {
            // Use siblingData to get the category from the same array item
            const siblingCategory = (siblingData as { category?: number | { id: number } })?.category;
            const dataCategory = (data as { category?: number | { id: number } })?.category;
            const categoryId = siblingCategory || dataCategory;
            if (categoryId) {
              // Handle both string ID and object with id property
              const categoryValue = typeof categoryId === 'object' ? categoryId.id || categoryId : categoryId;
              return {
                category: {
                  equals: categoryValue,
                },
              };
            }
            return true;
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: {
              en: 'Image for this practice area',
              fr: 'Image pour ce domaine de pratique',
            },
          },
        },
      ],
    },
    {
      name: 'perspectiveSection',
      type: 'group',
      label: {
        en: 'Perspective Section',
        fr: 'Section Perspective',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Our Perspective',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'The Value Gap',
        },
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          localized: true,
          defaultValue: 'Technology without business context is just cost. Finance without technical depth is just risk.',
        },
        {
          name: 'items',
          type: 'array',
          label: {
            en: 'Items',
            fr: 'Éléments',
          },
          minRows: 2,
          maxRows: 2,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'industriesSection',
      type: 'group',
      label: {
        en: 'Industries Section',
        fr: 'Section Industries',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Industries',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
          defaultValue: 'We bring sector-specific insight to every engagement.',
        },
        {
          name: 'industries',
          type: 'relationship',
          relationTo: 'industries',
          hasMany: true,
          required: true,
          admin: {
            description: {
              en: 'Select industries to display in the industries section',
              fr: 'Sélectionner les industries à afficher dans la section industries',
            },
          },
        },
      ],
    },
    {
      name: 'ctaSection',
      type: 'group',
      label: {
        en: 'CTA Section',
        fr: 'Section CTA',
      },
      fields: CTASectionFields,
    },
  ],
};

