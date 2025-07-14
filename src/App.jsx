import {Toaster} from 'react-hot-toast'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Pages/Home'
import Pricing from './Pages/Pricing'
import Result from './Pages/Result'

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
        element:<Result/>,
      }
    ]
  }
  
])
function App() {
  return <>
   <RouterProvider router={router}/>
   <Toaster/>
  </>
}

export default App
