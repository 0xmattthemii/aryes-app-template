'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PageMetadataContextType {
  isLightHeroPage: boolean;
  setIsLightHeroPage: (value: boolean) => void;
}

const PageMetadataContext = createContext<PageMetadataContextType | undefined>(undefined);

export function PageMetadataProvider({ children }: { children: ReactNode }) {
  const [isLightHeroPage, setIsLightHeroPage] = useState(false);

  return (
    <PageMetadataContext.Provider value={{ isLightHeroPage, setIsLightHeroPage }}>
      {children}
    </PageMetadataContext.Provider>
  );
}

export function usePageMetadata() {
  const context = useContext(PageMetadataContext);
  if (context === undefined) {
    throw new Error('usePageMetadata must be used within a PageMetadataProvider');
  }
  return context;
}







