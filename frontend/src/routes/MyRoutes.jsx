import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landingpage, Signin, Signup } from "../containers";

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path = "/" element = {<Landingpage />} />
                <Route path = "/signin" element = {<Signin />} />
                <Route path = "/signup" element = {<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes