import React  from "react";
import Register from './components/register.js'
import Header from './components/header.js'
import Body from './components/body.js'
import Nav from './components/nav.js'
import Login from './components/login.js'
import Chat from './components/chat.js'
import About from './components/about.js'
import Loading from './components/loading.js'
import Container from './components/container.js'
import { io } from "socket.io-client";
import SimpleEncryptor from "simple-encryptor"

console.log(process.env.HURL)

export const socket = io(process.env.HURL, {
  withCredentials: true,
  transports : ['websocket']
})


export const encryptor = SimpleEncryptor.createEncryptor(process.env.KEY);

function stringNumberify(v){
	var n = 1;
  for(var x of v){
  	n += (x.charCodeAt(0));
  }
  return n;
}

function logout(){
  socket.emit('logout', encryptor.encrypt(sessionStorage.getItem("user_id")));
}


function getPageStyle(type){
  switch(type) {
    case "nav.login":     return <Login />
    case "nav.register":  return <Register />
    case "nav.chat":      return <Chat />
    case "nav.about":     return <About />
    case "nav.logout":
      logout();
      return <Login />
  }
}



export default function App() {
  const [pageType, SetPageUpdate] = React.useState("nav.chat");
  const [isConnected, SetConnect] = React.useState(false);
  const [login, SetLogin] = React.useState(sessionStorage.getItem("loggedInAs"));
  const loggin = function(event){
    SetPageUpdate(event.target.id);
  }

  const pageStyle = getPageStyle(pageType);
  const body = <Body content={pageStyle}/>
  const logginAs  = sessionStorage.getItem("loggedInAs");
  const nav = <Nav onClick={loggin} login={login} />
  const header = <Header navBar={nav} login={login} setLogin={SetLogin} setPage={SetPageUpdate}/>
  const container = <Container header={header} body={body}/>
  const page = isConnected==true?( <div> {container} </div> ):<Loading connect={SetConnect}/>;
  return page;
}
