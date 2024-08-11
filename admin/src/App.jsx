import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Main from "./Layouts/Main/Main";
import Product from "./Pages/Product/Product";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element = {<Main/>}>
       <Route path="/" element ={<Product/>}/>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider
      router={router}
    /> 
    </>
  )
}

export default App
