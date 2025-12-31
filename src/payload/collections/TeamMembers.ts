import type { CollectionConfig } from 'payload';

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role'],
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      en: 'Team Member',
      fr: 'Membre de l\'équipe',
    },
    plural: {
      en: 'Team Members',
      fr: 'Membres de l\'équipe',
    },
  },
  fields: [
    {
      name: 'name',
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
          en: 'URL slug/anchor (e.g., maxime, alexandre)',
          fr: 'Slug/ancre URL (ex. maxime, alexandre)',
        },
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: {
          en: 'Job title/role (e.g., Co-founder)',
          fr: 'Titre de poste/rôle (ex. Co-fondateur)',
        },
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
      admin: {
        description: {
          en: 'Short bio/description',
          fr: 'Brève biographie/description',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      admin: {
        description: {
          en: 'Link to full profile page (e.g., /about#maxime)',
          fr: 'Lien vers la page de profil complète (ex. /about#maxime)',
        },
      },
      defaultValue: '/about',
    },
  ],
};
