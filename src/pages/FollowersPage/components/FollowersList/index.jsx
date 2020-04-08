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
                            <Avatar src={follower.profile_image} />
                        </ListItemAvatar>
                        <ListItemText primary={`${follower.first_name} ${follower.last_name}`} secondary={`Since: ${follower.created_at.split('T')[0]}`} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            )
            )}
        </List>
    );
}