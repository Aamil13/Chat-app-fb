import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Register from "./Pages/Register";
import {BrowserRouter , Routes  , Route, Navigate} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {

  const {currentuser} = useContext(AuthContext)
  
  const ProtectedRoute =({children})=>{
    if(!currentuser){
      return <Navigate to="/login" />
    }

    return children
  }
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={ <ProtectedRoute>
            <Main/>
          </ProtectedRoute> } />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
        </Route>
      </Routes>
    </BrowserRouter>

    // <div className="App">
    //   {/* <Login/> */}
    //   <Register/>
    //   {/* <Main/> */}
    // </div>
  );
}

export default App;
