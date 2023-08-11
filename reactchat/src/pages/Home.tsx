// import React from 'react'
import {Box} from '@mui/material'
import {CssBaseline} from '@mui/material'
import PrimaryAppBar from './templates/PrimaryAppBar'
import PrimaryDraw from './templates/PrimaryDraw'

const Home = () => {
  return (
    <div>
      <Box sx={{diplay:"flex"}}>
        <CssBaseline/>
        <PrimaryAppBar/>
        <PrimaryDraw></PrimaryDraw>
      </Box>
    </div>
  )
}

export default Home