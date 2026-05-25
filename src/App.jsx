import { RouterProvider } from "react-router";
import router from "./routing/router";
import { UserContextProvider } from "./context/UserContext";



function App() {


  return (
    <>

      <UserContextProvider>
        <RouterProvider router={router}>

        </RouterProvider>
      </UserContextProvider>
    </>
  )
}

export default App
