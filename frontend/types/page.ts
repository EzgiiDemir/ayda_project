export type Block =
    | { type: 'p'; value: string }
    | { type: 'h3'; value: string }
    | { type: 'ul'; items: string[] }
    | { type: 'ol'; items: string[] }
    | { type: 'image'; url: string; alt?: string };

export interface Section {
    id: string;
    title?: string;
    order: number;
    isActive?: boolean;
    blocks: Block[];
}
export interface PageDoc {
    slug: string;
    locale: string;
    heroImage?: string;
    pageTitle: string;
    metaTitle: string;
    metaDescription: string;
    sections: Section[];
    alternates?: { locale: string; slug: string }[];
}
