import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Main from "./Layouts/Main/Main";
import Admin from "./Pages/Admin/Admin";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element = {<Main/>}>
        <Route path="/" element = {<Admin/>}/>
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
