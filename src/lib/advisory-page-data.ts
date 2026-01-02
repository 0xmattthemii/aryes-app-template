import { getPayload } from 'payload';
import config from '@payload-config';
import type { AdvisoryPage, ServiceCategory, Service } from '@/types/payload-types';

export async function fetchAdvisoryPageData(locale: string): Promise<AdvisoryPage | null> {
  const payload = await getPayload({ config });

  const advisoryPage = await payload.findGlobal({
    slug: 'advisory-page',
    locale: locale as 'en' | 'fr',
    depth: 3, // Deep populate relationships (images, industries, service categories, services)
  });

  if (!advisoryPage) return null;

  // Populate services for each practice area if they are selected
  if (advisoryPage.practiceAreas && advisoryPage.practiceAreas.length > 0) {
    const practiceAreasWithServices = await Promise.all(
      advisoryPage.practiceAreas.map(async (practiceArea) => {
        const category = practiceArea.category as ServiceCategory | number;
        const categoryId = typeof category === 'object' && category !== null ? category.id : category;

        // Ensure category is populated
        const populatedCategory = typeof category === 'object' ? category : await payload.findByID({
          collection: 'service-categories',
          id: categoryId,
          locale: locale as 'en' | 'fr',
        });

        // Handle services - could be IDs or populated objects
        const servicesData = (practiceArea as any).services;
        let populatedServices: Service[] = [];

        if (servicesData && Array.isArray(servicesData) && servicesData.length > 0) {
          // Check if services are already populated (objects) or just IDs
          if (typeof servicesData[0] === 'object' && servicesData[0] !== null && 'id' in servicesData[0]) {
            // Already populated
            populatedServices = servicesData as Service[];
          } else {
            // Need to fetch services by IDs
            const serviceIds = servicesData.filter((id: any) => id != null);
            if (serviceIds.length > 0) {
              const servicesResult = await payload.find({
                collection: 'services',
                where: {
                  id: {
                    in: serviceIds,
                  },
                },
                locale: locale as 'en' | 'fr',
                depth: 1,
                limit: 100,
              });
              populatedServices = servicesResult.docs as Service[];
            }
          }
        }

        return {
          ...practiceArea,
          category: populatedCategory,
          services: populatedServices,
        };
      })
    );

    return {
      ...advisoryPage,
      practiceAreas: practiceAreasWithServices,
    } as AdvisoryPage;
  }

  return advisoryPage as AdvisoryPage;
}

