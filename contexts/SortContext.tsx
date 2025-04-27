import { createContext, useContext, useState, ReactNode } from 'react';

type SortOrder = 'asc' | 'desc';

type SortContextType = {
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
};

const SortContext = createContext<SortContextType | undefined>(undefined);

export const SortProvider = ({ children }: { children: ReactNode }) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  return (
    <SortContext.Provider value={{ sortOrder, setSortOrder }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSort = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error('useSort must be used within a SortProvider');
  }
  return context;
};