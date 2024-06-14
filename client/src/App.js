import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import AddBook from "./components/AddBook"
import EditBook from "./components/EditBook"

function App() {
const user = localStorage.getItem("token")
return (
<Routes>
{user && <Route path="/" exact element={<Main />} />}
<Route path="/signup" exact element={<Signup />} />
<Route path="/login" exact element={<Login />} />
<Route path="/" element={<Navigate replace to="/login" />} />
{user && <Route path="/addBook" exact element={<AddBook/>} />}
{user && <Route path="/editBook" exact element={<EditBook/>} />}
<Route path="/addBook" element={<Navigate replace to="/login" />} />
<Route path="/editBook" element={<Navigate replace to="/login" />} />
</Routes>
)
}
export default App