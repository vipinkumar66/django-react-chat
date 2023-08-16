import {AppBar, Box, Drawer, IconButton, Toolbar, Typography, useMediaQuery} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'
import Link from '@mui/material/Link'
import React from 'react'
import ExploreCategories from '../../components/secondarydrawer/ExploreCategories'

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

    const list = () =>(
        <Box sx={{
            paddingTop: `${theme.primaryAppBar.height}px`,
            minWidth:200
        }}
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}>
            <ExploreCategories/>
        </Box>
    );

  return (
    <AppBar sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`
    }}>
        <Toolbar
        variant='dense'
        sx={{height:theme.primaryAppBar.height,
            minHeight: theme.primaryAppBar.height,}}>

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
            {list()}
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
