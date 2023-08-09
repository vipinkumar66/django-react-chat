import {AppBar, Toolbar, Typography} from '@mui/material'
import { useTheme } from '@emotion/react'
import Link from '@mui/material/Link'

const PrimaryAppBar = () => {
    const theme = useTheme()
  return (
    <AppBar sx={{
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`
    }}>
        <Toolbar variant='dense' sx={{height:theme.primaryAppBar.height}}>
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
