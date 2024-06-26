import { useEffect, useState } from "react";
import {
  getConnectedUser,
  getSession,
  logOut,
} from "../../services/AdminService";
import { AuthContext } from "./authContext";

const AuthProvider = (props) => {
  //const navigate = useNavigate()
  const [user, setUser] = useState(null);
  async function getUser() {
    let res = await getConnectedUser();
    if (res) {
      setUser(res.data);
    } else {
      logOut();
      // navigate('/signin')
    }
  }
  useEffect(() => {
    if (getSession()) {
      getUser();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
