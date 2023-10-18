import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landingpage } from "../containers";

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path = "/" element = {<Landingpage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes