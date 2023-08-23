import Home from "./pages/Home"
import { createBrowserRouter, Route, RouterProvider,
   createRoutesFromElements } from "react-router-dom"

import Explore from "./pages/Explore"
import ToggleColorMode from "./components/ToggleColorMode"
import Servers from "./pages/Servers"
import Login from "./pages/Login"
import { AuthServiceProvider } from "./context/AuthContext"
import TestLogin from "./pages/TestLogin"
import ProtectedRoutes from "./services/ProtectedRoutes"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/server/:serverId/:channelId?" element={<Servers/>}/>
      <Route path="/explore/:categoryName" element={<Explore/>}/>
      <Route
      path="/test"
      element={
        <ProtectedRoutes>
          <TestLogin/>
        </ProtectedRoutes>
      }/>

    </Route>
  )
)

const App = () =>{
  return (
    <AuthServiceProvider>
      <ToggleColorMode>
        <RouterProvider router={router}/>
      </ToggleColorMode>
    </AuthServiceProvider>
  )
}

export default App
