import  {useAuthServiceContext}  from "../context/AuthContext"

const TestLogin = () => {
    const {isLoggedIn} = useAuthServiceContext();
  return (
    <div>
      {isLoggedIn.toString()}
    </div>
  )
}

export default TestLogin
