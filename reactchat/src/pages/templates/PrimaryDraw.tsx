import { Drawer, Box, useMediaQuery, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import DrawToggle from '../../components/primarydrawer/DrawToggle';

const PrimaryDraw = () => {
    const theme = useTheme();
    const below600 = useMediaQuery("(max-width:599px)")
    const [open, setOpen] = React.useState(!below600)

    React.useEffect(()=>{
        setOpen(!below600)
    },[below600])

    const handleDrawerOpen = () =>{
        setOpen(true);
    }

    const handleDrawerClose = () =>{
        setOpen(false);
    }

  return (

    <Drawer open={open} variant={below600 ? 'temporary':'permanent'}
    PaperProps={{
        sx:{mt:`${theme.primaryAppBar.height}px`,
        height:`calc(100vh)-${theme.primaryAppBar.height}px`,
        width:theme.primaryDraw.width,
    }
    }}>
        <Box sx={{
            position:"absolute", top:0, right:0, p:0, width:open?"auto":"100%"
        }}>
            <DrawToggle/>
            <Box>
                {[...Array(100)].map((_, i) => (
                    <Typography key={i}>{i+1}</Typography>
                ))}
            </Box>
        </Box>
    </Drawer>
  )
}

export default PrimaryDraw
