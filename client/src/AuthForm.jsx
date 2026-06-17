import {useState} from "react"; 
import {useEffect} from "react"; 
import { createClient } from "@supabase/supabase-js";
import "./AuthForm.css"

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

const AuthForm = ({setLoginState}) => {

    const [userView, setUserView] = useState("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const switchToSignUp = () => {
        setUserView("signup")
    }

    const switchToLogin = () => {
        setUserView("login")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (userView === "signup") {
            const {data, error} = await supabase.auth.signUp({
                email: email,
                password: password
            })

            if (error) {
                console.log(error)
            }

            else {
                setEmail("")
                setPassword("")
                setLoginState("loggedin")
            }

        }

        else if (userView === "login") {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email, 
                password: password
            })

            if (error) {
                console.log(error)
            }

            else {
                setEmail("")
                setPassword("")
                setLoginState("loggedin")
            }


        }
    }

    return (
        <div class="auth-page">
        <div>
            <h1>MoodTrax</h1>
            <button id="changeMode" onClick={switchToSignUp}>Sign Up</button>
            <button id="changeMode" onClick={switchToLogin}>Log In</button>


            {userView === "login" && (
            <div id="login-page">
                <h2>Log In</h2>
                <form  onSubmit={handleSubmit}>
                    <div className="input-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="Email Address" required onChange={(e)=>setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </div> 
        )}

            {userView === "signup" && (
            <div id="signup-page">
                <h2>Sign Up</h2>
                <form  onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="Email Address" required onChange={(e) => setEmail(e.target.value)}/>
                        <label>Password</label>
                        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button id="submitButton" type="submit">Sign Up</button>
                </form>
            </div>
            )}
        </div>
        </div>



    )

}

export default AuthForm;