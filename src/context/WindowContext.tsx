import { createContext, useContext, useState, ReactNode } from 'react';

interface WindowState {
  [key: string]: {
    isOpen: boolean;
    originRect: DOMRect | null;
  };
}

interface WindowContextType {
  windows: WindowState;
  openWindow: (id: string, originRect?: DOMRect | null) => void;
  closeWindow: (id: string) => void;
  isWindowOpen: (id: string) => boolean;
  getWindowOrigin: (id: string) => DOMRect | null;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState>({});

  const openWindow = (id: string, originRect: DOMRect | null = null) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        isOpen: true,
        originRect,
      },
    }));
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
      },
    }));
  };

  const isWindowOpen = (id: string) => {
    return windows[id]?.isOpen ?? false;
  };

  const getWindowOrigin = (id: string) => {
    return windows[id]?.originRect ?? null;
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        isWindowOpen,
        getWindowOrigin,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindow = () => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindow must be used within a WindowProvider');
  }
  return context;
};

