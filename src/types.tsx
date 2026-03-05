export type Menu = {
    id: string;
    createdAt: string;
    deletedAt: string | null;
    updatedAt: string;
    nama: string;
    deskripsi: string;
    harga: number;
    size: Size;
    label: Label;
    kategori: Kategori;
}

export type Size = "small" | "medium" | "large" | null;
export type Label = 'vegan' | 'gluten_free' | 'halal' | 'low_cal' | null;
export type Kategori = 'makanan' | 'minuman' | null;

export type PostMenuData = Omit<Menu, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>

export type MenuListResponse = Menu[];


export type MenuResponse = Menu;