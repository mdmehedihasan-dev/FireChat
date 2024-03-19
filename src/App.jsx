
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Registration from "./pages/Registration"
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
          <Route path="/home" element={<Home/>} />
          <Route path="/sign-up" element={<Registration/>}/>
          <Route path="/" element={<Login/>}/>
         
      </Route>
    )
  );

  return (
  <>
  <ToastContainer />
  <RouterProvider router={router}/>
  
  </>
  )
}

export default App