import React from "react";
import Register from './register.js'
import Header from './header.js'
import Body from './body.js'
import Nav from './nav.js'
import Login from './login.js'
import Chat from './chat.js'
import About from './about.js'
import Container from './container.js'
import { io } from "socket.io-client";

export const socket = io("http://localhost:6055");


const options = ["login", "register", "chat", "about"];

export default function App() {

  const [pageType, SetPageUpdate] = React.useState("nav.register");
  //const [signedInAs, SetLogin] = React.useState("nav.register");

  const loggin = function(event){
    SetPageUpdate(event.target.id);
  }

  let pageStyle;


  switch(pageType) {
    case "nav.login":
      pageStyle = <Login />;break;
    case "nav.register":
      pageStyle = <Register />;break;
    case "nav.chat":
      pageStyle = <Chat />;break;
    case "nav.about":
      pageStyle = <About />;break;

  }

  const body = <Body content={pageStyle}/>
  const logginAs  = sessionStorage.getItem("loggedInAs");

  const somx = true;
  const nav = <Nav options={options} onClick={loggin} />
  const header = <Header navBar={nav} login={logginAs}/>
  const container = <Container header={header} body={body}/>

  return (
    <div>
    {container}
    </div>
  );
}
