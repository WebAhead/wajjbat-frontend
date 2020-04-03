import React from 'react';
import { makeStyles, List , ListItem , ListItemText , ListItemAvatar, Avatar, Divider} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        margin: 'auto',
        maxWidth: 960,
        backgroundColor: theme.palette.background.paper,
    }
}));

export default function InsetDividers({businessFollowersData}) {
    
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {businessFollowersData.map(follower => (
                <div>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src="https://creativeartworksblog.files.wordpress.com/2019/02/horseanddog-jeffjett.jpeg?w=754&h=754" />
                        </ListItemAvatar>
                        <ListItemText primary={`Mahmod Mhamed ID ${follower.id}`} secondary={`Since: ${follower.created_at}`} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            )
            )}
        </List>
    );
}