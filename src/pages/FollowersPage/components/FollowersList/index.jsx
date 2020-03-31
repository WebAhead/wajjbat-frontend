import React from 'react';
import { makeStyles, List , ListItem , ListItemText , ListItemAvatar, Avatar, Divider} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '85%',
        maxWidth: 960,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function InsetDividers() {

    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar src="https://creativeartworksblog.files.wordpress.com/2019/02/horseanddog-jeffjett.jpeg?w=754&h=754" />
                </ListItemAvatar>
                <ListItemText primary="Mahmod Mhamed" secondary="Since: Jan 9, 2014" />
            </ListItem>
            <Divider variant="inset" component="li" />


            <ListItem>
                <ListItemAvatar>
                    <Avatar src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=804" />
                </ListItemAvatar>
                <ListItemText primary="Najwan Abu Saleh" secondary="Since: Jan 9, 2014" />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
                <ListItemAvatar>
                    <Avatar src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Maruti-Alto-800/7066/1565265450182/front-left-side-47.jpg?tr=h-140" />
                </ListItemAvatar>
                <ListItemText primary="Rabea Fahoum" secondary="Since: Jan 9, 2014" />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
                <ListItemAvatar>
                    <Avatar src="https://media3.s-nbcnews.com/j/newscms/2019_41/3047866/191010-japan-stalker-mc-1121_06b4c20bbf96a51dc8663f334404a899.fit-760w.JPG" />
                </ListItemAvatar>
                <ListItemText primary="Mario Saliba" secondary="Since: Jan 9, 2014" />
            </ListItem>
            <Divider variant="inset" component="li" />

        </List>
    );
}