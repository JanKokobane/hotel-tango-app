import React, { createContext, useContext, useState } from "react";
import styles from "./Sidebar.module.css";

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      <div
        className={`${styles.sidebarLayout} ${
          isOpen ? styles.open : styles.closed
        }`}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};

export const Sidebar: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const { isOpen } = useSidebar();
  return (
    <aside
      className={`${styles.sidebar} ${
        isOpen ? styles.open : styles.closed
      } ${className}`}
    >
      {children}
    </aside>
  );
};

export const SidebarHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`${styles.sidebarHeader} ${className}`}>{children}</div>
);

export const SidebarContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className={styles.sidebarContent}>{children}</div>;

export const SidebarFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`${styles.sidebarFooter} ${className}`}>{children}</div>
);

export const SidebarMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <nav className={styles.sidebarMenu}>{children}</nav>;

export const SidebarMenuItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className={styles.sidebarMenuItem}>{children}</div>;

export const SidebarMenuButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}> = ({ children, onClick, isActive = false, className = "" }) => (
  <button
    onClick={onClick}
    className={`${styles.sidebarMenuButton} ${
      isActive ? styles.active : ""
    } ${className}`}
  >
    {children}
  </button>
);

export const SidebarTrigger: React.FC = () => {
  const { toggle } = useSidebar();
  return (
    <button
      className={styles.sidebarTrigger}
      onClick={toggle}
      aria-label="Toggle sidebar"
    >
      ☰
    </button>
  );
};
