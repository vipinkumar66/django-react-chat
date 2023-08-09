// import React from 'react'
import {Box} from '@mui/material'
import {CssBaseline} from '@mui/material'
import PrimaryAppBar from './templates/PrimaryAppBar'

const Home = () => {
  return (
    <div>
      <Box sx={{diplay:"flex"}}>
        <CssBaseline/>
        <PrimaryAppBar/>
      </Box>
    </div>
  )
}

export default Home
