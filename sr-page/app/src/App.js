import {BrowserRouter, Route} from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import ChannelContextProvider from "./contexts/ChannelContext";

import Home from "./pages/Home";
import Channel from "./pages/Channel";
import Category from "./pages/Category";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ChannelContextProvider>
          <BrowserRouter>
            <Navbar></Navbar>
            <Route exact path="/" component={Home}/>
            <Route exact path="/channel/programs/:id" component={Channel}/>
            <Route exact path="/channel/categories/:id" component={Category}/>
            <Route exact path="/signIn" component={SignIn}/>
            <Route exact path="/myPage" component={MyPage}/>
          </BrowserRouter>
        </ChannelContextProvider>
      </UserProvider>
    </div>
  );
}

export default App;
