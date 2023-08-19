import {
    Box, Typography
    ,List, ListItem,
    ListItemButton, ListItemIcon,
    ListItemText
} from '@mui/material'

import { Link, useParams } from 'react-router-dom'
import {useTheme} from '@mui/material/styles'
import { Server } from '../../@types/server'

interface ServerChannelProps {
    data: Server[];
}

const ServerChannels = (props:ServerChannelProps) =>{
    const theme = useTheme();
    const {data} = props;
    const isDarkMode = theme.palette.mode === "dark";
    const server_name = data?.[0]?.name ?? "Server";
    const {serverId} = useParams();

    return <>
        <Box
        sx={{
            height:"50px",
            display:"flex",
            alignItems:"center",
            px:2,
            borderBottom:`1px solid ${theme.palette.divider}`,
            position:"sticky",
            top:1,
            backgroundColor:theme.palette.background.default
        }}>
            <Typography variant='body1'
            style={{textOverflow:"ellipsis",
            overflow:"hidden",
            whiteSpace:"nowrap"}}>
                {server_name}
            </Typography>
        </Box>
        <List sx={{py:0}}>
            {data.flatMap((obj)=>
            obj.channel_server.map((item) =>(
                <ListItem disablePadding
                key={item.id} sx={{
                display:"block",
                maxHeight:"40px"
                }} dense={true}>
                    <Link to={`/server/${serverId}/${item.id}`} style={{
                        textDecoration:"none",
                        color:"inherit"}}>
                            <ListItemButton sx={{minHeight:40}}>
                                <ListItemText primary={<Typography
                                variant='body1' textAlign="start" paddingLeft={1}>
                                    {item.name}</Typography>}></ListItemText>
                            </ListItemButton>
                        </Link>
                </ListItem>
            )))}
        </List>
    </>;
};

export default ServerChannels;