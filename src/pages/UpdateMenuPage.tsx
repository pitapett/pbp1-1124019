import { useEffect, useState } from "react"
import type { Kategori, Label, MenuResponse, Size, Menu } from "../types"
import { useParams } from "react-router-dom"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";



export default function UpdateMenuPage() {

    const { id } = useParams();
    const [formData, setFormData] = useState<MenuResponse>({
        id: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
        nama: '',
        deskripsi: '',
        harga: 0,
        size: null,
        kategori: null,
        label: null
    });

    useEffect(() => {
        async function loadFormData() {
            try {
                const response = await fetch(`/api/menu/${id}`)
                if (!response.ok) {
                    return;
                }
                const data = await response.json() as MenuResponse;
                setFormData(data);

            } catch {

            }
        }
        loadFormData();
    }, [id])

    const updateMenu = async (updatedMenu: Menu): Promise<Menu> => {

        const response = await fetch(`/api/update-menu/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedMenu),
            headers: { 'Content-type': 'application/json' }
        });


        const data: Menu = await response.json()
        if (response.ok) {
            alert('menu sucessfully updated')
        } else {
            alert('menu update failed')
        }

        return data;
    }

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        updateMenu(formData)
    }

    return (

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'

        }}>
            <Stack
                component="form"
                sx={{ maxWidth: '35ch' }}
                spacing={2}
                noValidate
                autoComplete="off"
                alignItems={'center'}
            >
                <Typography variant={'h4'}>Update Existing Menu</Typography>

                <TextField id="menu-name" value={formData.nama} label="Name" variant="outlined" onChange={(e) => setFormData({ ...formData, nama: e.target.value })} fullWidth required />

                <TextField id="menu-desc" value={formData.deskripsi} label="Description" variant="outlined" onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} fullWidth required />

                <TextField
                    id="menu-price"
                    type="number"
                    label="Price"
                    value={formData.harga}
                    onChange={(e) => {
                        const val = e.target.value;
                        const numericValue = parseInt(val, 10);
                        if (!isNaN(numericValue)) {
                            setFormData({ ...formData, harga: numericValue });
                        }
                    }}
                />
                <FormControl fullWidth>
                    <InputLabel id="size-input-label">Size</InputLabel>
                    <Select
                        labelId="size-input-label"
                        id="size-input"
                        value={formData.size || ''}
                        label="Size"
                        onChange={(e) => setFormData({ ...formData, size: e.target.value as Size })}
                    >
                        <MenuItem value="small">Small</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="large">Large</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="label-input-label">Label</InputLabel>
                    <Select
                        labelId="label-input-label"
                        id="label-input"
                        value={formData.label || ''}
                        label="Label"
                        onChange={(e) => setFormData({ ...formData, label: e.target.value as Label })}
                    >
                        <MenuItem value="vegan">Vegan</MenuItem>
                        <MenuItem value="gluten_free">Gluten Free</MenuItem>
                        <MenuItem value="halal">Halal</MenuItem>
                        <MenuItem value="low_cal">Low Calorie</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="kategori-input-label">Kategori</InputLabel>
                    <Select
                        labelId="kategori-input-label"
                        id="kategori-input"
                        value={formData.kategori || ''}
                        label="Kategori"
                        onChange={(e) => setFormData({ ...formData, kategori: e.target.value as Kategori })}
                    >
                        <MenuItem value="makanan">Makanan</MenuItem>
                        <MenuItem value="minuman">Minuman</MenuItem>

                    </Select>
                </FormControl>

                <Button type="submit" onClick={handleSubmit}>Update Menu</Button>

            </Stack>
        </Box >
    )
}