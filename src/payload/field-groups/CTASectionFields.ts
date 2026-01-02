import type { Field } from 'payload';

export const CTASectionFields: Field[] = [
  {
    name: 'title',
    type: 'richText',
    required: true,
    localized: true,
    admin: {
      description: {
        en: 'CTA title (supports rich text formatting)',
        fr: 'Titre CTA (supporte le formatage de texte enrichi)',
      },
    },
  },
  {
    name: 'subtitle',
    type: 'textarea',
    required: true,
    localized: true,
    admin: {
      description: {
        en: 'CTA subtitle/description',
        fr: 'Sous-titre/description CTA',
      },
    },
  },
  {
    name: 'buttonText',
    type: 'text',
    required: true,
    localized: true,
    defaultValue: 'Start the conversation',
    admin: {
      description: {
        en: 'Text displayed on the CTA button',
        fr: 'Texte affiché sur le bouton CTA',
      },
    },
  },
  {
    name: 'buttonLink',
    type: 'text',
    required: true,
    defaultValue: '/contact',
    admin: {
      description: {
        en: 'URL path for the CTA button (e.g., /contact)',
        fr: 'Chemin URL pour le bouton CTA (ex. /contact)',
      },
    },
  },
  {
    name: 'backgroundColor',
    type: 'select',
    options: [
      { label: { en: 'Stone', fr: 'Pierre' }, value: 'stone' },
      { label: { en: 'White', fr: 'Blanc' }, value: 'white' },
      { label: { en: 'Dark', fr: 'Sombre' }, value: 'dark' },
    ],
    defaultValue: 'stone',
    admin: {
      description: {
        en: 'Background color variant',
        fr: 'Variante de couleur d\'arrière-plan',
      },
    },
  },
];

