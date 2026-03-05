import { useEffect, useState } from "react";
import type { Menu, MenuResponse } from "../../types";
import { useParams, Link } from "react-router-dom";
import { Alert, Card, CardActions, CardContent, CardHeader, Container, IconButton, Paper, Snackbar, Stack, Typography } from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




export default function MenuDetailsPage() {
    const [menu, setMenu] = useState<Menu>();
    const { id } = useParams();

    const handleDelete = async (menuId: string) => {
        // 1. (Optional) Ask for confirmation
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            const response = await fetch(`/api/delete-menu/${menuId}`, {
                method: 'DELETE',

            });

            if (response.ok) {
                alert("sucessfully deleted")

            } else {
                alert("failed to delete")
            }
        } catch (error) {
            alert("error")
        }
    };

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

                            <Link to={`/menu-update/${menu.id}`}>
                                <IconButton>
                                    <EditIcon></EditIcon>
                                </IconButton>
                            </Link>

                            <IconButton aria-label="delete"
                                color="error"
                                onClick={() => handleDelete(menu.id)}>
                                <DeleteIcon></DeleteIcon>
                            </IconButton>


                        </CardContent>
                        <CardActions disableSpacing />
                    </Card>}
                </Stack>
            </Paper>
        </Stack>
    </Container>

}

