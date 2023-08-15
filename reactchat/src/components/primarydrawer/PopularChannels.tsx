import {
    Box, Typography
    ,List, ListItem,
    ListItemButton, ListItemIcon,
    ListItemText
} from '@mui/material'

import useCrud from '../../hooks/useCrud'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { Link } from 'react-router-dom'
import {MEDIA_URL} from '../../config'
import React, { useEffect } from 'react'
import { Padding } from '@mui/icons-material'

interface Server {
    id:number,
    name:string,
    category:string,
    icon:string,
}


type Props = {
    open:boolean;
}


const PopularChannels: React.FC<Props> = ({open}) =>{
    // useCrud takes two properties, Inital data and the url
    const {dataCRUD, fetchData, error, isLoading} = useCrud<Server>([], "/server/select/")

    useEffect(()=>{
     fetchData();
    },[]);

    useEffect (()=>{
        console.log(dataCRUD)
    },[dataCRUD])

return (
    <>
        <Box sx={{
            height: 50,
            p: 2,
            display: "flex",
            alignItems: "center",
            flex: "1 1 100%",

        }}>
            <Typography sx={{
                display: open ? "block": "none"
            }}>Popular</Typography>
        </Box>
        <List>
          {dataCRUD.map((item)=>(
            <ListItem
            key={item.id}
            disablePadding
            sx={{display:"block"}}
            dense={true}>
                <Link
                to={`server/${item.id}`}
                style={{textDecoration:"none", color:'inherit'}}>
                    <ListItemButton
                    sx={{minHeight:0,}}>
                        <ListItemIcon sx={{minWidth:0, justifyContent:"center"}}>
                            <ListItemAvatar sx={{minWidth:"50px"}}>
                                <Avatar alt="server icon" src={`${MEDIA_URL}${item.icon}`}></Avatar>
                            </ListItemAvatar>
                        </ListItemIcon>
                        <ListItemText
                            primary={
                            <Typography
                                varient="body2"
                                sx={{
                                    fontWeight:700,
                                    lineHeight:1.2,
                                    textOverflow:"ellipsis",
                                    overflow:"hidden",
                                    whiteSpace:"nowrap"
                                }}
                                >{item.name}</Typography>}
                                secondary={<Typography variant="body2" sx={{
                                    fontweight:500,
                                    lineHeight:1.2,
                                    color:"textSecondary"
                                }}>{item.category}</Typography>}
                                sx={{opacity: open ? 1 : 0}}
                                primaryTypographyProps={{sx:{textOverflow:"ellipsis", overflow:"hidden", whitespace:"nowrap"}}}
                        />
                    </ListItemButton>
                </Link>
            </ListItem>
            ))}
        </List>
    </>
)
}

export default PopularChannels;