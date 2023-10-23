import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landingpage, Signin, Signup, Main} from "../containers";

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path = "/" element = {<Landingpage />} />
                <Route path = "/signin" element = {<Signin />} />
                <Route path = "/signup" element = {<Signup />} />
                <Route path = "/main" element = {<Main />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes