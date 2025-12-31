import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: {
    en: 'Site Settings',
    fr: 'Paramètres du site',
  },
  admin: {
    description: {
      en: 'Global site settings including company information and branding',
      fr: 'Paramètres globaux du site incluant les informations de l\'entreprise et la marque',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
      {
        name: 'company',
        type: 'group',
        label: {
          en: 'Company Information',
          fr: 'Informations de l\'entreprise',
        },
        fields: [
          {
            name: 'name',
            type: 'text',
            required: true,
            localized: true,
            defaultValue: 'Aryes',
            admin: {
              description: {
                en: 'Company name used throughout the site',
                fr: 'Nom de l\'entreprise utilisé sur tout le site',
              },
            },
          },
          {
            name: 'legalName',
            type: 'text',
            localized: true,
            admin: {
              description: {
                en: 'Full legal company name (e.g., "Aryes Advisory SA")',
                fr: 'Nom légal complet de l\'entreprise (ex. "Aryes Advisory SA")',
              },
            },
          },
          {
            name: 'email',
            type: 'email',
            required: true,
            defaultValue: 'contact@aryes.io',
            admin: {
              description: {
                en: 'Primary contact email address',
                fr: 'Adresse e-mail de contact principale',
              },
            },
          },
          {
            name: 'phone',
            type: 'text',
            admin: {
              description: {
                en: 'Phone number (optional)',
                fr: 'Numéro de téléphone (optionnel)',
              },
            },
          },
          {
            name: 'address',
            type: 'group',
            label: {
              en: 'Address',
              fr: 'Adresse',
            },
          fields: [
            {
              name: 'street',
              type: 'text',
              localized: true,
            },
            {
              name: 'city',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Geneva',
            },
            {
              name: 'country',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Switzerland',
            },
            {
              name: 'display',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Geneva, Switzerland',
              admin: {
                description: {
                  en: 'Formatted address for display (e.g., "Geneva, Switzerland")',
                  fr: 'Adresse formatée pour l\'affichage (ex. "Genève, Suisse")',
                },
              },
            },
          ],
        },
      ],
    },
      {
        name: 'logo',
        type: 'group',
        label: {
          en: 'Logo',
          fr: 'Logo',
        },
        fields: [
          {
            name: 'type',
            type: 'select',
            required: true,
            defaultValue: 'text',
            options: [
              { label: { en: 'Text-based (current)', fr: 'Basé sur le texte (actuel)' }, value: 'text' },
              { label: { en: 'Image', fr: 'Image' }, value: 'image' },
            ],
            admin: {
              description: {
                en: 'Choose between text-based logo or image logo',
                fr: 'Choisir entre un logo basé sur le texte ou une image',
              },
            },
          },
          {
            name: 'textLogo',
            type: 'group',
            label: {
              en: 'Text Logo Settings',
              fr: 'Paramètres du logo texte',
            },
            admin: {
              condition: (data) => data?.logo?.type === 'text',
            },
            fields: [
              {
                name: 'text',
                type: 'text',
                required: true,
                defaultValue: 'Aryes',
                admin: {
                  description: {
                    en: 'Text to display as logo',
                    fr: 'Texte à afficher comme logo',
                  },
                },
              },
              {
                name: 'accent',
                type: 'text',
                defaultValue: '.',
                admin: {
                  description: {
                    en: 'Accent character/word after company name (e.g., ".")',
                    fr: 'Caractère/mot d\'accent après le nom de l\'entreprise (ex. ".")',
                  },
                },
              },
            ],
          },
          {
            name: 'imageLogo',
            type: 'group',
            label: {
              en: 'Image Logo Settings',
              fr: 'Paramètres du logo image',
            },
            admin: {
              condition: (data) => data?.logo?.type === 'image',
            },
            fields: [
              {
                name: 'logoLight',
                type: 'upload',
                relationTo: 'media',
                admin: {
                  description: {
                    en: 'Logo for light backgrounds',
                    fr: 'Logo pour les arrière-plans clairs',
                  },
                },
              },
              {
                name: 'logoDark',
                type: 'upload',
                relationTo: 'media',
                admin: {
                  description: {
                    en: 'Logo for dark backgrounds (optional, falls back to light logo)',
                    fr: 'Logo pour les arrière-plans sombres (optionnel, utilise le logo clair par défaut)',
                  },
                },
              },
            {
              name: 'alt',
              type: 'text',
              localized: true,
              defaultValue: 'Aryes Logo',
            },
          ],
        },
      ],
    },
  ],
};

