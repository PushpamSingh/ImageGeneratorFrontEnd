import {Toaster} from 'react-hot-toast'
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Pages/Home'
import Pricing from './Pages/Pricing'
import Result from './Pages/Result'
import { useGetUser } from './Hooks/UsegetUser'


function App() {
  const {authUser,isLoading,error}=useGetUser()

const isAuthuser=Boolean(authUser)
const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>,
      },
      {
        path:"/buy",
        element:<Pricing/>,
      },
      {
        path:"/result",
        element:(
          isAuthuser ? (
            <Result/>
          ):(
            <Navigate to="/"/>
          )
        ),
      }
    ]
  }
  
])
  return <>
   <RouterProvider router={router}/>
   <Toaster/>
  </>
}

export default App
