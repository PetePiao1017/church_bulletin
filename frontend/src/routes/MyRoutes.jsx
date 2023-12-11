import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin, Signup, Public, UserManage, Wait, Block} from "../containers";
// import socketIO from 'socket.io-client';

// const socket = socketIO.connect('http://localhost:5000', {
//   withCredentials: true,
//   transports: ['websocket', 'polling'],
// });

const MyRoutes = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Signin />} />
                <Route exact path = "/signup" element = {<Signup />} />
                <Route exact path = "/main" element = {<Public />} />
                <Route exact path = "/manage" element = {<UserManage />} />
                <Route exact path = "/manage" element = {<UserManage />} />
                <Route exact path = "/pending" element = {<Wait />} />
                <Route exact path = "/block" element = {<Block />} />
            </Routes>
        </BrowserRouter>
    )
}   

export default MyRoutes