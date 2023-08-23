import  {useAuthServiceContext}  from "../context/AuthContext"
import React from 'react'
import jwtinterceptor from "../helpers/jwtinterceptor";

const TestLogin = () => {

    const jwtAxios = jwtinterceptor();
    const {isLoggedIn, logout} = useAuthServiceContext();
    const [username, setUsername] = React.useState("");

    const getUserDetails = async () =>{
      try{
          const userid = localStorage.getItem("userId");
          const accessToken = localStorage.getItem("access_token");

          const response = await jwtAxios.get(`http://127.0.0.1:8000/api/account/?user_id=${userid}`, {
              headers:{
                  Authorization: `Bearer ${accessToken}`
              }
          });
          const userNam = response.data
          setUsername(userNam.username)
      }catch (error){
          console.log(error,"error")
      }
  }
  return (
    <>
      <div>
        {isLoggedIn.toString()}
      </div>
      <div>
        <button onClick={logout}>Logout</button>
        <button onClick={getUserDetails}>Get User Details: {username}</button>
      </div>
    </>
  )
}

export default TestLogin
