import type { Block } from '@/types/page';

export const p  = (value: string): Block      => ({ type: 'p',  value } as const);
export const h3 = (value: string): Block      => ({ type: 'h3', value } as const);
export const ul = (items: string[]): Block    => ({ type: 'ul', items } as const);
export const ol = (items: string[]): Block    => ({ type: 'ol', items } as const);
