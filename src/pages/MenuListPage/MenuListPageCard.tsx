import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import type { Menu } from "../../types";
import { Visibility } from '@mui/icons-material';
import { Link } from "react-router";

import { formatDate } from "../../utils/formatDate";

type MenuListPageCardProps = {
    menu: Menu;
}

export function MenuListPageCard(props: MenuListPageCardProps) {
    const { menu: menu } = props;
    return <Card >
        <CardHeader
            title={menu.nama}
            subheader={`created at: ${formatDate(menu.createdAt)} updated at: ${formatDate(menu.updatedAt)}`}
        />
        <CardContent sx={{ height: 80, overflow: 'auto' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {menu.harga}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <Link to={`/menu/${menu.id}`}>
                <IconButton aria-label="visit">
                    <Visibility />
                </IconButton>
            </Link>
        </CardActions>
    </Card>
}