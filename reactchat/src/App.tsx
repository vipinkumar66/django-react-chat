import Home from "./pages/Home"
import { createBrowserRouter, Route, RouterProvider,
   createRoutesFromElements } from "react-router-dom"

import Explore from "./pages/Explore"
import ToggleColorMode from "./components/ToggleColorMode"
import Servers from "./pages/Servers"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home/>}/>
      <Route path="/server/:serverId/:channelId?" element={<Servers/>}/>
      <Route path="/explore/:categoryName" element={<Explore/>}/>

    </Route>
  )
)

const App = () =>{
  return (
    <ToggleColorMode>
      <RouterProvider router={router}/>
    </ToggleColorMode>
  )
}

export default App
