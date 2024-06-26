import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Product";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import AuthProvider from "./context/auth/authProvider";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Frames from "./pages/Frames";
import OrderDetails from "./pages/OrderDetails";
import { useEffect, useState } from "react";
import { useAuth } from "./context/auth/authContext";
import Coupons from "./pages/Coupons";

function Routers() {
  const auth = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    let isConnected = localStorage.getItem("connect");
    if (isConnected) {
      setIsConnected(true);
    }
  }, [JSON.stringify(auth.user)]);

  return (
    <div className="App">
      <Switch>
        {isConnected && <Redirect from="/sign-in" to="/dashboard" />}
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/" component={() => <Redirect to="/sign-in" />} />
          {!isConnected && (
          <Route exact path="**" component={() => <Redirect to="/sign-in" />} />
        )}
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/products" component={Tables} />
          <Route exact path="/coupons" component={Coupons} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/frames" component={Frames} />
          <Route exact path="/orders/:id" component={OrderDetails} />
        </Main>
       
      </Switch>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routers />
    </AuthProvider>
  );
}

export default App;
