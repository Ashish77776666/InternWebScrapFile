import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../firebase'
const auth = getAuth(app)
const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const SigninUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((value) => alert("success"))
            .catch((err) => alert(err))
    }
    return (
        <div className="signin-page">
            <h1>Signin Page</h1>
            <label> Email</label>
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder="Enter your email">
            </input>
            <label> Password</label>
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder="Enter you password">
            </input>
            <button onClick={SigninUser}>Sigin</button>
        </div>
    )
}
export default SigninPage;