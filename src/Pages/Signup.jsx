import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { app } from '../firebase'
const auth = getAuth(app)
const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password).then((value)=>alert("success"))
    }
    return (
        <div className="signup-page">
            <h1>Signup Page</h1>
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
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder="Enter you password">
            </input>
            <button onClick={createUser}>Signup</button>
        </div>
    )
}
export default SignupPage;