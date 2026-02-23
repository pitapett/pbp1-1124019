import { useEffect, useState } from "react";
import type { Menu, MenuResponse } from "../../types";
import { useParams } from "react-router-dom";
import { Card, CardActions, CardContent, CardHeader, Container, Paper, Stack, Typography } from "@mui/material";
import { formatDate } from "../../utils/formatDate";

export default function MenuDetailsPage() {

    const [menu, setMenu] = useState<Menu>();

    const { id } = useParams();
    useEffect(() => {
        async function loadMenu() {
            try {
                const response = await fetch(`/api/menu/${id}`)
                if (!response.ok) {
                    return;
                }
                const data = await response.json() as MenuResponse;
                setMenu(data);

            } catch {

            }

        }
        loadMenu();
    }, [id])

    return <Container>
        <Stack py={2}>
            <Paper>
                <Stack alignItems='center' p={2}>
                    {menu && <Card>
                        <CardHeader
                            title={menu.nama}
                            subheader={`${formatDate(menu.createdAt)}`}
                        />
                        <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                desc: {menu.deskripsi}
                                <br />
                                label: {menu.label}
                                <br />
                                kategori: {menu.kategori}
                                <br />
                                price: {menu.harga}
                                <br />
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                        </CardActions>
                    </Card>}
                </Stack>
            </Paper>
        </Stack>
    </Container>

}