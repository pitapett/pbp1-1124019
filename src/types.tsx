export type Menu = {
    id: string;
    createdAt: string;
    deletedAt: string | null;
    updatedAt: string;
    nama: string;
    deskripsi: string;
    harga: number;
    size: string;
    label: string;
    kategori: string;
}

export type MenuListResponse = Menu;


export type MenuResponse = Menu;