
export interface IvfIcsiSection {
    id: string;
    title: string;
    content: string;
    order: number;
    isActive?: boolean;
}

export interface IvfIcsiConfig {
    heroImage: string;
    pageTitle: string;
    sections: IvfIcsiSection[];
}

export const DEFAULT_IVF_ICSI_CONFIG: IvfIcsiConfig = {
    heroImage: 'https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg',
    pageTitle: 'Tüp Bebek (IVF) - ICSI',
    sections: [],
};

