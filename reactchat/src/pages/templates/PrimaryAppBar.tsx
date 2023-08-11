import {AppBar, Box, Drawer, IconButton, Toolbar, Typography, useMediaQuery} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@emotion/react'
import Link from '@mui/material/Link'
import React from 'react'

const PrimaryAppBar = () => {

    const theme = useTheme()
    const [sideMenu, setSideMenu] = React.useState(false)

    const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

    React.useEffect(()=>{
        if (isSmallScreen && sideMenu){
            setSideMenu(false);
        }
    },[isSmallScreen])

    const toggleDrawer = (open:boolean) => (event) =>{
        if(
            event.type === "keydown" &&
            ((event.key === "Tab")||
            (event.key === "Shift"))
        ){
            return;
        }
            setSideMenu(open);
    }

  return (
    <AppBar sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`
    }}>
        <Toolbar
        variant='dense'
        sx={{height:theme.primaryAppBar.height}}>

        <Box sx={{display:{xs:"block", sm:"none"}}}>
            <IconButton
                color="inherit"
                aria-label='open drawer'
                edge="start"
                sx={{mr:2}}
                onClick={toggleDrawer(true)}>

                <MenuIcon/>

            </IconButton>
        </Box>
        <Drawer anchor='left' open={sideMenu} onClose={toggleDrawer(false)}>
            {[...Array(100)].map((_, i) => (
                <Typography key={i}>{i+1}</Typography>
            ))}
        </Drawer>
        <Link href="/" underline='none' color="inherit">
            <Typography variant='h5' noWrap component="div" sx={{
                display:{fontWeight:700, letterSpacing:"-0.5px"}
            }}>
                DjChat
            </Typography>
        </Link>

        </Toolbar>
    </AppBar>
  )
}

export default PrimaryAppBar
