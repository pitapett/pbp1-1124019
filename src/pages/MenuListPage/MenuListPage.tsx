import { Box, Container, Grid, Paper, Stack} from "@mui/material";
import { useEffect, useState } from "react";
import type { Menu, MenuListResponse } from "../../types";
import { MenuListPageCard } from "./MenuListPageCard";
import { Title } from "@mui/icons-material";

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
                        <Title>Menu</Title>
                    </Box>
                    <Grid container spacing={2}>
                        {menus.map(record =>
                            <Grid key={record.id} size={{ md: 4 }}>
                                <MenuListPageCard menu={record} />
                            </Grid>
                        )}
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