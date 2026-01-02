import type { Field } from 'payload';

export const PageHeaderFields: Field[] = [
  {
    name: 'category',
    type: 'text',
    required: true,
    localized: true,
    admin: {
      description: {
        en: 'Category label shown above the title',
        fr: 'Libellé de catégorie affiché au-dessus du titre',
      },
    },
  },
  {
    name: 'title',
    type: 'text',
    required: true,
    localized: true,
    admin: {
      description: {
        en: 'Main page title',
        fr: 'Titre principal de la page',
      },
    },
  },
  {
    name: 'subtitle',
    type: 'text',
    required: true,
    localized: true,
    admin: {
      description: {
        en: 'Subtitle/description text',
        fr: 'Texte de sous-titre/description',
      },
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: {
        en: 'Background image for the header',
        fr: 'Image d\'arrière-plan pour l\'en-tête',
      },
    },
  },
  {
    name: 'withBlueLine',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      description: {
        en: 'Show blue accent line below category',
        fr: 'Afficher la ligne d\'accent bleue sous la catégorie',
      },
    },
  },
  {
    name: 'size',
    type: 'select',
    options: [
      { label: { en: 'Standard', fr: 'Standard' }, value: 'standard' },
      { label: { en: 'Large', fr: 'Grand' }, value: 'large' },
    ],
    defaultValue: 'standard',
    admin: {
      description: {
        en: 'Header size variant',
        fr: 'Variante de taille de l\'en-tête',
      },
    },
  },
];

