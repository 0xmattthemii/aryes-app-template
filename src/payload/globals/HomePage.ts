import type { GlobalConfig } from 'payload';

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: {
    en: 'Home Page',
    fr: 'Page d\'accueil',
  },
  admin: {
    description: {
      en: 'Configure home page content',
      fr: 'Configurer le contenu de la page d\'accueil',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
      {
        name: 'hero',
        type: 'group',
        label: {
          en: 'Hero Section',
          fr: 'Section héro',
        },
        fields: [
          {
            name: 'title',
            type: 'text',
            required: true,
            localized: true,
            admin: {
              description: {
                en: 'Main hero title',
                fr: 'Titre principal de la section héro',
              },
            },
          },
          {
            name: 'titleHighlight',
            type: 'text',
            required: true,
            localized: true,
            admin: {
              description: {
                en: 'Highlighted part of the title (e.g., "We build.")',
                fr: 'Partie mise en évidence du titre (ex. "Nous construisons.")',
              },
            },
          },
          {
            name: 'subtitle',
            type: 'richText',
            required: true,
            localized: true,
            admin: {
              description: {
                en: 'Hero subtitle/description. Use bold text for highlighted parts.',
                fr: 'Sous-titre/description de la section héro. Utilisez le texte en gras pour les parties mises en évidence.',
              },
            },
          },
          {
            name: 'videos',
            type: 'array',
            label: {
              en: 'Hero Background Videos',
              fr: 'Vidéos d\'arrière-plan de la section héro',
            },
            admin: {
              description: {
                en: 'Videos that rotate in the hero background',
                fr: 'Vidéos qui tournent en arrière-plan de la section héro',
              },
            },
            minRows: 1,
            fields: [
              {
                name: 'video',
                type: 'upload',
                relationTo: 'media',
                required: true,
                admin: {
                  description: {
                    en: 'Video file to display in the hero background',
                    fr: 'Fichier vidéo à afficher en arrière-plan de la section héro',
                  },
                },
              },
            ],
          },
          {
            name: 'ctaButtons',
            type: 'array',
            label: {
              en: 'Call-to-Action Buttons',
              fr: 'Boutons d\'appel à l\'action',
            },
            maxRows: 3,
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
              {
                name: 'style',
                type: 'select',
                options: [
                  { label: { en: 'Secondary (Border)', fr: 'Secondaire (Bordure)' }, value: 'secondary' },
                  { label: { en: 'Primary (Glass)', fr: 'Principal (Verre)' }, value: 'primary' },
                ],
                defaultValue: 'secondary',
              },
            ],
          },
          {
            name: 'scrollLabel',
            type: 'text',
            label: {
              en: 'Scroll Indicator Label',
              fr: 'Libellé de l\'indicateur de défilement',
            },
            required: true,
            localized: true,
            defaultValue: 'Scroll',
            admin: {
              description: {
                en: 'Text displayed in the scroll indicator at the bottom of the hero section',
                fr: 'Texte affiché dans l\'indicateur de défilement en bas de la section héro',
              },
            },
          },
      ],
    },
      {
        name: 'whatWeDo',
        type: 'group',
        label: {
          en: 'What We Do Section',
          fr: 'Section Ce que nous faisons',
        },
        fields: [
          {
            name: 'cards',
            type: 'array',
            label: {
              en: 'Cards',
              fr: 'Cartes',
            },
            admin: {
              description: {
                en: 'Add cards to display in the "What We Do" section',
                fr: 'Ajouter des cartes à afficher dans la section "Ce que nous faisons"',
              },
            },
            minRows: 1,
            fields: [
              {
                name: 'badge',
                type: 'text',
                required: true,
                localized: true,
                admin: {
                  description: {
                    en: 'Badge text shown at the top of the card (e.g., "Advisory", "Capital")',
                    fr: 'Texte du badge affiché en haut de la carte (ex. "Conseil", "Capital")',
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
                    en: 'Card title',
                    fr: 'Titre de la carte',
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
                    en: 'Card description text',
                    fr: 'Texte de description de la carte',
                  },
                },
              },
              {
                name: 'href',
                type: 'text',
                required: true,
                admin: {
                  description: {
                    en: 'Link URL (e.g., /advisory, /capital)',
                    fr: 'URL du lien (ex. /advisory, /capital)',
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
                    en: 'Card background image',
                    fr: 'Image d\'arrière-plan de la carte',
                  },
                },
              },
            ],
          },
          {
            name: 'learnMoreLabel',
            type: 'text',
            label: {
              en: 'Learn More Label',
              fr: 'Libellé En savoir plus',
            },
            required: true,
            localized: true,
            defaultValue: 'Learn more',
            admin: {
              description: {
                en: 'Text displayed on the "Learn more" link in each card',
                fr: 'Texte affiché sur le lien "En savoir plus" dans chaque carte',
              },
            },
          },
      ],
    },
      {
        name: 'approach',
        type: 'group',
        label: {
          en: 'The Approach Section',
          fr: 'Section L\'approche',
        },
        fields: [
          {
            name: 'label',
            type: 'text',
            required: true,
            localized: true,
            defaultValue: 'Our Philosophy',
          },
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
          {
            name: 'ctaLabel',
            type: 'text',
            required: true,
            localized: true,
            defaultValue: 'Read about our approach →',
          },
          {
            name: 'ctaHref',
            type: 'text',
            required: true,
            defaultValue: '/advisory',
          },
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
          },
        ],
      },
      {
        name: 'leadership',
        type: 'group',
        label: {
          en: 'Leadership Section',
          fr: 'Section Direction',
        },
        fields: [
          {
            name: 'label',
            type: 'text',
            required: true,
            localized: true,
            defaultValue: 'Leadership',
          },
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
          {
            name: 'teamMembers',
            type: 'relationship',
            relationTo: 'team-members',
            hasMany: true,
            required: true,
            admin: {
              description: {
                en: 'Select team members to display in the leadership section',
                fr: 'Sélectionner les membres de l\'équipe à afficher dans la section direction',
              },
            },
          },
        ],
      },
      {
        name: 'contact',
        type: 'group',
        label: {
          en: 'Contact Section',
          fr: 'Section Contact',
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
          {
            name: 'email',
            type: 'text',
            admin: {
              description: {
                en: 'Contact email (references Site Settings company email by default)',
                fr: 'E-mail de contact (fait référence à l\'e-mail de l\'entreprise dans les paramètres du site par défaut)',
              },
            },
            defaultValue: 'contact@aryes.io',
          },
          {
            name: 'location',
            type: 'text',
            admin: {
              description: {
                en: 'Location display text (references Site Settings company address by default)',
                fr: 'Texte d\'affichage de l\'emplacement (fait référence à l\'adresse de l\'entreprise dans les paramètres du site par défaut)',
              },
            },
            localized: true,
            defaultValue: 'Geneva, Switzerland',
          },
          {
            name: 'ctaLabel',
            type: 'text',
            required: true,
            localized: true,
            defaultValue: 'Start a conversation',
          },
          {
            name: 'ctaHref',
            type: 'text',
            required: true,
            defaultValue: '/contact',
          },
        ],
      },
  ],
};

