import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./firebase";
import "./App.css";
import SignupPage from "./Pages/Signup";
import Webscarp from "./Pages/webscrap";
import SigninPage from "./Pages/Signin";
import { useEffect, useState } from "react";
import MenuWithDocuments from "../src/Pages/menu";
const auth = getAuth(app);
function App() {
const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("you are logged out");
        setUser(null);
      }
    });
  }, []);
  if (user === null) {
    return (
      <div className="App">
        <SignupPage />
        <SigninPage></SigninPage>
      </div>
    );
  } else {
    return (
      <div>
        <div id="maindiv">
          <div id="leftdiv">
            <MenuWithDocuments></MenuWithDocuments>
          </div>
          <div id="centerdiv">
            <Webscarp></Webscarp>
          </div>
          <div id="rightdiv" className="App">
          <p>Hello, {user.email}</p>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
        </div>
      </div>
    );
  }
}
export default App;
