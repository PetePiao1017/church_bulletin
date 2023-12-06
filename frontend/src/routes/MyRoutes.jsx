import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landingpage, Signin, Signup, Main, Profile, Public, Private, Confirm} from "../containers";
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:5000', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
});

const MyRoutes = () => {
    

    useEffect(() => {
        socket.emit('sendMessage', 'Hereeeeeeeeeeeeeee');
    }, []);
    return (
        <BrowserRouter socket = {socket}>
            <Routes>
                <Route exact path = "/" element = {<Landingpage socket = {socket} />} />
                <Route path = "/signin" element = {<Signin socket = {socket} />} />
                <Route path = "/signup" element = {<Signup socket = {socket} />} />
                <Route path = "/public" element = {<Public socket = {socket} />} />
                <Route path = "/private" element = {<Private socket = {socket} />} />
                <Route exact path = "/main/profile" element = {<Profile socket = {socket} />} />
                <Route exact path = "/main" element = {<Main socket = {socket} />} />
                <Route exact path = "/confirm/:id" element = {<Confirm socket = {socket} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes