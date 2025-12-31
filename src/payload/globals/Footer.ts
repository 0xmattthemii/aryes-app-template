import type { GlobalConfig } from 'payload';

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    en: 'Footer',
    fr: 'Pied de page',
  },
  admin: {
    description: {
      en: 'Configure footer content and links',
      fr: 'Configurer le contenu et les liens du pied de page',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
      {
        name: 'companyLinks',
        type: 'array',
        label: {
          en: 'Company Links',
          fr: 'Liens de l\'entreprise',
        },
        admin: {
          description: {
            en: 'Links shown in the Company column',
            fr: 'Liens affichés dans la colonne Entreprise',
          },
        },
        fields: [
          {
            name: 'label',
            type: 'text',
            required: true,
            localized: true,
          },
          {
            name: 'href',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        name: 'legalLinks',
        type: 'array',
        label: {
          en: 'Legal Links',
          fr: 'Liens légaux',
        },
        admin: {
          description: {
            en: 'Links shown in the Legal column',
            fr: 'Liens affichés dans la colonne Légale',
          },
        },
        fields: [
          {
            name: 'label',
            type: 'text',
            required: true,
            localized: true,
          },
          {
            name: 'href',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        name: 'socialLinks',
        type: 'array',
        label: {
          en: 'Social Media Links',
          fr: 'Liens des réseaux sociaux',
        },
        admin: {
          description: {
            en: 'Social media links (LinkedIn, etc.)',
            fr: 'Liens des réseaux sociaux (LinkedIn, etc.)',
          },
        },
        fields: [
          {
            name: 'platform',
            type: 'select',
            required: true,
            options: [
              { label: { en: 'LinkedIn', fr: 'LinkedIn' }, value: 'linkedin' },
              { label: { en: 'Twitter', fr: 'Twitter' }, value: 'twitter' },
              { label: { en: 'Other', fr: 'Autre' }, value: 'other' },
            ],
          },
          {
            name: 'url',
            type: 'text',
            required: true,
            admin: {
              description: {
                en: 'Full URL to the social media profile',
                fr: 'URL complète du profil sur le réseau social',
              },
            },
          },
        ],
      },
      {
        name: 'copyright',
        type: 'text',
        required: true,
        localized: true,
        admin: {
          description: {
            en: 'Copyright text. Use {year} for current year, {company} for company name, {location} for location.',
            fr: 'Texte de copyright. Utilisez {year} pour l\'année en cours, {company} pour le nom de l\'entreprise, {location} pour l\'emplacement.',
          },
        },
        defaultValue: '© {year} {company} · {location}',
      },
  ],
};

