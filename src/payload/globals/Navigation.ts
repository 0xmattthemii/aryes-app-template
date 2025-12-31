import type { GlobalConfig } from 'payload';

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: {
    en: 'Navigation',
    fr: 'Navigation',
  },
  admin: {
    description: {
      en: 'Configure header navigation menu structure. Any navigation item can optionally have a mega menu.',
      fr: 'Configurer la structure du menu de navigation de l\'en-tête. Chaque élément de navigation peut optionnellement avoir un méga menu.',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
      {
        name: 'items',
        type: 'array',
        label: {
          en: 'Navigation Items',
          fr: 'Éléments de navigation',
        },
        admin: {
          description: {
            en: 'Define all navigation items. Each item can optionally have a mega menu.',
            fr: 'Définir tous les éléments de navigation. Chaque élément peut optionnellement avoir un méga menu.',
          },
        },
        minRows: 1,
        fields: [
          {
            name: 'label',
            type: 'text',
            required: true,
            localized: true,
            admin: {
              description: {
                en: 'Navigation label (e.g., "Advisory", "Capital", "About", "Contact")',
                fr: 'Libellé de navigation (ex. "Conseil", "Capital", "À propos", "Contact")',
              },
            },
          },
          {
            name: 'href',
            type: 'text',
            required: true,
            admin: {
              description: {
                en: 'URL path (e.g., /advisory, /capital, /about, /contact)',
                fr: 'Chemin URL (ex. /advisory, /capital, /about, /contact)',
              },
            },
          },
          {
            name: 'megaMenu',
            type: 'relationship',
            relationTo: 'mega-menus',
            label: {
              en: 'Mega Menu',
              fr: 'Méga menu',
            },
            admin: {
              description: {
                en: 'Select a mega menu to display for this navigation item (optional)',
                fr: 'Sélectionner un méga menu à afficher pour cet élément de navigation (optionnel)',
              },
            },
          },
      ],
    },
  ],
};

