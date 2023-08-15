import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import jwtinterceptor from "../../helpers/jwtinterceptor";
import { ReactNode } from "react";


type SecondaryDrawProps = {
  children: ReactNode;
};

const SecondaryDraw = ({children}:SecondaryDrawProps) => {
    const theme = useTheme();
    const jwtAxios = jwtinterceptor()

    jwtAxios.get("http://127.0.0.1:8000/api/server/select/?category=3")
    .then((response)=>{
      console.log(response.data)
    }).catch((error) =>{
      console.error(error)
    })

  return (
    <Box sx={{
        minWidth: `${theme.secondaryDraw.width}px`,
        mt:`${theme.primaryAppBar.height}px`,
        height:`calc(100vh - ${theme.primaryAppBar.height}px )`,
        borderRight:`1px solid ${theme.palette.divider}`,
        overflow:'auto',

        display:{xs:"none", sm:"block"},
    }}>
        {children}
    </Box>

  )
}

export default SecondaryDraw;
