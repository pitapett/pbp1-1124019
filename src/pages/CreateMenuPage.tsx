import { useState } from "react";
import type { PostMenuData, Menu, Size, Label, Kategori } from "../types";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { NumberField } from '@base-ui/react/number-field';



export default function CreateMenuPage() {
    const [menu, setMenu] = useState<PostMenuData>({
        nama: '',
        deskripsi: '',
        harga: 0,
        size: null,
        kategori: null,
        label: null
    });

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        createMenu(menu)
    }

    const createMenu = async (newMenu: PostMenuData): Promise<Menu> => {

        const response = await fetch('/api/create-menu', {
            method: 'POST',
            body: JSON.stringify(newMenu),
            headers: { 'Content-type': 'application/json' }
        });


        const data: Menu = await response.json()
        if(response.ok){
            alert('menu sucessfully created')
        } else{
            alert('menu creation failed')
        }

        return data;
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
                <Typography variant={'h4'}>Create New Menu</Typography>

                <TextField id="menu-name" label="Name" variant="outlined" onChange={(e) => setMenu({ ...menu, nama: e.target.value })} fullWidth required />

                <TextField id="menu-desc" label="Description" variant="outlined" onChange={(e) => setMenu({ ...menu, deskripsi: e.target.value })} fullWidth required />

                <TextField
                    id="menu-price"
                    type="number"
                    label="Price"
                    value={menu.harga}
                    onChange={(e) => {
                        const val = e.target.value;
                        const numericValue = parseInt(val, 10);
                        if (!isNaN(numericValue)) {
                            setMenu({ ...menu, harga: numericValue });
                        }
                    }}
                />
                <FormControl fullWidth>
                    <InputLabel id="size-input-label">Size</InputLabel>
                    <Select
                        labelId="size-input-label"
                        id="size-input"
                        value={menu.size || ''}
                        label="Size"
                        onChange={(e) => setMenu({ ...menu, size: e.target.value as Size })}
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
                        value={menu.label || ''}
                        label="Label"
                        onChange={(e) => setMenu({ ...menu, label: e.target.value as Label })}
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
                        value={menu.kategori || ''}
                        label="Kategori"
                        onChange={(e) => setMenu({ ...menu, kategori: e.target.value as Kategori })}
                    >
                        <MenuItem value="makanan">Makanan</MenuItem>
                        <MenuItem value="minuman">Minuman</MenuItem>

                    </Select>
                </FormControl>

                <Button type="submit" onClick={handleSubmit}>Create Menu</Button>

            </Stack>
        </Box >
    )
}