// import React from 'react'
import {Box, CssBaseline} from '@mui/material'
import PrimaryAppBar from './templates/PrimaryAppBar'
import PrimaryDraw from './templates/PrimaryDraw'
import SecondaryDraw from './templates/SecondaryDraw'
import Main from './templates/Main'
import PopularChannels from '../components/primarydrawer/PopularChannels'
import ExploreCategories from '../components/secondarydrawer/ExploreCategories'
import ExploreServers from '../components/main/ExploreServers'


const Explore = () => {
  return (
    <Box sx={{ display:"flex" }}>
      <CssBaseline/>
      <PrimaryAppBar/>
      <PrimaryDraw>
        <PopularChannels open={false}/>
      </PrimaryDraw>
      <SecondaryDraw>
        <ExploreCategories/>
      </SecondaryDraw>
      <Main>
        <ExploreServers/>
      </Main>
    </Box>
  )
}

export default Explore
