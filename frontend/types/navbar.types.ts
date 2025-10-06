// types/navbar.types.ts

export interface NavLink {
    id: string;
    label: string;
    href: string;
    isExternal?: boolean;
    icon?: string;
    order?: number;
    isActive?: boolean;
}

export interface NavDropdown {
    id: string;
    label: string;
    links: NavLink[];
    icon?: string;
    order?: number;
}

export interface NavLogo {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    link?: string;
}

export interface NavContact {
    phoneNumber: string;
    whatsappNumber?: string;
    email?: string;
}

export interface NavConfig {
    logo: NavLogo;
    about: NavDropdown;
    treatments: NavDropdown;
    links: NavLink[];
    contact: NavContact;
    meta?: {
        version?: string;
        lastUpdated?: string;
    };
}

// API Response types
export interface NavbarApiResponse {
    data: NavConfig;
    meta?: {
        locale: string;
        timestamp: string;
    };
}

export interface NavbarError {
    message: string;
    code?: string;
    details?: unknown;
}