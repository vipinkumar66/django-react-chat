// import React from 'react'
import {Box, CssBaseline} from '@mui/material'
import PrimaryAppBar from './templates/PrimaryAppBar'
import PrimaryDraw from './templates/PrimaryDraw'
import SecondaryDraw from './templates/SecondaryDraw'
import Main from './templates/Main'
import MessageInterface from '../components/main/MessageInterface'
import ServerChannels from '../components/secondarydrawer/ServerChannels'
import UserServers from '../components/primarydrawer/UserServers'
import { useNavigate, useParams } from 'react-router-dom'
import useCrud from '../hooks/useCrud'
import { Server } from '../@types/server'
import { useEffect } from 'react'

const Servers = () => {

    const navigate = useNavigate();
    const {serverId, channelId} = useParams();

    const {dataCRUD, error, isLoading, fetchData} = useCrud<Server>(
        [],
        `/server/select/?by_server=${serverId}`
    );
    if (error!==null && error.message === "400"){
        navigate("/");
        return null;
    }

    useEffect(()=>{
        fetchData();
    },[])

    const isChannel = (): Boolean =>{
        if (!channelId){
            return true;
        }
        return dataCRUD.some((server) =>
        server.channel_server.some(
            (channel) => channel.id === parseInt(channelId)
        )
      )
    }

    useEffect(()=>{
      if (!isChannel()){
        navigate(`/server/${serverId}`);
      }
    },[isChannel, channelId])

  return (
    <Box sx={{ display:"flex" }}>
      <CssBaseline/>
      <PrimaryAppBar/>
      <PrimaryDraw>
        <UserServers open={false} data={dataCRUD}/>
      </PrimaryDraw>
      <SecondaryDraw>
        <ServerChannels data={dataCRUD}/>
      </SecondaryDraw>
      <Main>
        <MessageInterface/>
      </Main>
    </Box>
  )
}

export default Servers
