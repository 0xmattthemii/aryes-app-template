import sharp from 'sharp'
import { lexicalEditor, FixedToolbarFeature, TextStateFeature, defaultColors } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'

// Collections
import { Media } from './src/payload/collections/Media'
import { ServiceCategories } from './src/payload/collections/ServiceCategories'
import { Services } from './src/payload/collections/Services'
import { Industries } from './src/payload/collections/Industries'
import { TeamMembers } from './src/payload/collections/TeamMembers'
import { MegaMenus } from './src/payload/collections/MegaMenus'

// Globals
import { SiteSettings } from './src/payload/globals/SiteSettings'
import { Navigation } from './src/payload/globals/Navigation'
import { Footer } from './src/payload/globals/Footer'
import { HomePage } from './src/payload/globals/HomePage'
import { AdvisoryPage } from './src/payload/globals/AdvisoryPage'


export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      TextStateFeature({
        state: {
          color: {
            ...defaultColors.text,
            'aryes-blue': {
              label: 'Aryes Blue',
              css: {
                color: '#417aff',
              },
            },
          },
        },
      }),
    ],
    
  }),

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en, fr },
  },
  localization: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  collections: [
    Media,
    ServiceCategories,
    Services,
    Industries,
    TeamMembers,
    MegaMenus,
  ],
  globals: [
    SiteSettings,
    Navigation,
    Footer,
    HomePage,
    AdvisoryPage,
  ],
  typescript: {
    outputFile: './src/types/payload-types.ts',
  },
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
})
