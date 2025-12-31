import type { CollectionConfig } from 'payload';

export const MegaMenus: CollectionConfig = {
  slug: 'mega-menus',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      en: 'Mega Menu',
      fr: 'Méga menu',
    },
    plural: {
      en: 'Mega Menus',
      fr: 'Méga menus',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: {
          en: 'Internal name for this mega menu (e.g., "Advisory Menu")',
          fr: 'Nom interne pour ce méga menu (ex. "Menu Conseil")',
        },
      },
    },
    {
      name: 'overviewLink',
      type: 'group',
      label: {
        en: 'Overview Link',
        fr: 'Lien de vue d\'ensemble',
      },
      admin: {
        description: {
          en: 'Optional overview link shown at the top of the mega menu',
          fr: 'Lien de vue d\'ensemble optionnel affiché en haut du méga menu',
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          admin: {
            description: {
              en: 'Label for the overview link',
              fr: 'Libellé pour le lien de vue d\'ensemble',
            },
          },
        },
        {
          name: 'sectionLabel',
          type: 'text',
          localized: true,
          admin: {
            description: {
              en: 'Optional section heading label. If not provided, no heading will be shown.',
              fr: 'Libellé d\'en-tête de section optionnel. S\'il n\'est pas fourni, aucun en-tête ne sera affiché.',
            },
          },
        },
        {
          name: 'href',
          type: 'text',
          admin: {
            description: {
              en: 'URL path for the overview link',
              fr: 'Chemin URL pour le lien de vue d\'ensemble',
            },
          },
        },
      ],
    },
    {
      name: 'servicesColumnTitle',
      type: 'text',
      localized: true,
      label: {
        en: 'Services Column Title',
        fr: 'Titre de la colonne Services',
      },
      admin: {
        description: {
          en: 'Title displayed at the top of the Services column',
          fr: 'Titre affiché en haut de la colonne Services',
        },
      },
    },
    {
      name: 'servicesUrlPathSegment',
      type: 'text',
      admin: {
        description: {
          en: 'URL path segment for services (e.g., "services"). Used to construct URLs like /basePath/{urlPathSegment}/{service-slug}. Defaults to "services" if not provided.',
          fr: 'Segment de chemin URL pour les services (ex. "services"). Utilisé pour construire des URL comme /basePath/{urlPathSegment}/{service-slug}. Par défaut "services" si non fourni.',
        },
      },
    },
    {
      name: 'serviceCategories',
      type: 'array',
      label: {
        en: 'Services',
        fr: 'Services',
      },
      admin: {
        description: {
          en: 'Service categories and their associated services to display in the mega menu',
          fr: 'Catégories de services et leurs services associés à afficher dans le méga menu',
        },
      },
      fields: [
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'service-categories',
          required: true,
          admin: {
            description: {
              en: 'Select the service category to display',
              fr: 'Sélectionner la catégorie de service à afficher',
            },
          },
        },
        {
          name: 'services',
          type: 'relationship',
          relationTo: 'services',
          hasMany: true,
          required: true,
          admin: {
            description: {
              en: 'Select services to display in this category. Services will be filtered by the selected category automatically.',
              fr: 'Sélectionner les services à afficher dans cette catégorie. Les services seront filtrés automatiquement par la catégorie sélectionnée.',
            },
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
      ],
    },
    {
      name: 'industriesColumnTitle',
      type: 'text',
      localized: true,
      label: {
        en: 'Industries Column Title',
        fr: 'Titre de la colonne Industries',
      },
      admin: {
        description: {
          en: 'Title displayed at the top of the Industries column',
          fr: 'Titre affiché en haut de la colonne Industries',
        },
      },
    },
    {
      name: 'industries',
      type: 'relationship',
      relationTo: 'industries',
      hasMany: true,
      label: {
        en: 'Industries',
        fr: 'Industries',
      },
      admin: {
        description: {
          en: 'Industries to display in the mega menu',
          fr: 'Industries à afficher dans le méga menu',
        },
      },
    },
    {
      name: 'industriesUrlPathSegment',
      type: 'text',
      admin: {
        description: {
          en: 'URL path segment for industries (e.g., "industries", "sectors"). Used to construct URLs like /basePath/{urlPathSegment}/{industry-slug}. Defaults to "items" if not provided.',
          fr: 'Segment de chemin URL pour les industries (ex. "industries", "sectors"). Utilisé pour construire des URL comme /basePath/{urlPathSegment}/{industry-slug}. Par défaut "items" si non fourni.',
        },
      },
    },
  ],
};

