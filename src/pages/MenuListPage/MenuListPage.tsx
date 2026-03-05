import { Box, Container, Grid, IconButton, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import type { Menu, MenuListResponse } from "../../types";
import { MenuListPageCard } from "./MenuListPageCard";
import { Add } from "@mui/icons-material";
import { Link } from "react-router";

export default function MenuListPage() {
    const [menus, setMenus] = useState<Menu[]>([])
    
    useEffect(() => {
        async function loadMenus() {
            try {
                const response = await fetch('/api/list-menu')
                if (!response.ok) {
                    console.log('bad response')
                    return;
                }

                const data = await response.json() as MenuListResponse;
                setMenus(data);
            } catch {
                console.log('error occured')
            }
        }

        loadMenus();

    }, [])

    return <Container>
        <Box>
            <Paper>
                <Stack>
                    <Box justifyContent='center' display='flex'>
                        <h1>Menu</h1>
                    </Box>
                    <Grid container spacing={2}>
                        {menus.map(record =>
                            <Grid key={record.id} size={{ md: 4 }}>
                                <MenuListPageCard menu={record} />
                            </Grid>
                        )}
                        <Grid size={"auto"} justifyContent={"center"} marginBlock={"auto"} paddingInline={'20px'}>
                            <Link to={'/create-menu'}>
                                <IconButton aria-label="Add Menu">
                                    <Add />
                                </IconButton>
                            </Link>

                        </Grid>
                    </Grid>

                </Stack>
            </Paper>
        </Box>
    </Container>

    // return menus.map(record =>
    //     <ul>
    //         <li>${record.nama}</li>
    //     </ul>
    // )
}