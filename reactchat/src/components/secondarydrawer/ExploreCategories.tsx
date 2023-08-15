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
import {useTheme} from '@mui/material/styles'


interface Category {
    id:number;
    name:string;
    description:string;
    category_icon:string;
}

const ExploreCategories = () =>{
    const theme = useTheme();
    const {dataCRUD, fetchData, error, isLoading} = useCrud<Category>([], "/server/category/")

    useEffect(()=>{
        fetchData();
    }, []);

    useEffect (()=>{
        console.log(dataCRUD)
    },[])

    return <>
        <Box
        sx={{
            height:"50px",
            display:"flex",
            alignItems:"center",
            px:2,
            borderBottom:`1px solid ${theme.palette.divider}`,
            position:"sticky",
            top:0,
            backgroundColor:theme.palette.background.default
        }}>
            Explore
        </Box>
        <List sx={{py:0}}>
            {dataCRUD.map((item)=>(
                <ListItem disablePadding key={item.id} sx={{
                    display:"block"
                }} dense={true}>
                    <Link to={`/explore/${item.name}`} style={{
                        textDecoration:"none",
                        color:"inherit"}}>
                            <ListItemButton sx={{minHeight:40}}>
                                <ListItemIcon sx={{minWidth:0, justifyContent:"center"}}>
                                <ListItemAvatar sx={{minWidth:"0px"}}>
                                    <img src={`${MEDIA_URL}${item.category_icon}`} alt="Category Icon"
                                    style ={{
                                        width:"25px", height:"25px", display:"block",
                                        margin:"auto"
                                    }}/>
                                </ListItemAvatar>
                                </ListItemIcon>
                                <ListItemText primary={<Typography
                                variant='body1' textAlign="start" paddingLeft={1}>
                                    {item.name}</Typography>}></ListItemText>
                            </ListItemButton>
                        </Link>
                </ListItem>
            ))}
        </List>
    </>;
};

export default ExploreCategories;