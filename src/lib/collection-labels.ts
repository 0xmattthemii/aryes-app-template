import type { CollectionConfig } from 'payload';
import type { Config } from '@/types/payload-types';

export const getCollectionLabel = (
  collection: CollectionConfig,
  locale: Config['locale'],
  form: 'singular' | 'plural'
): string | undefined => {
  const label = form === 'plural' ? collection.labels?.plural : collection.labels?.singular;
  if (label && typeof label === 'object' && locale in label) {
    return label[locale as keyof typeof label] as string;
  }
  return undefined;
};