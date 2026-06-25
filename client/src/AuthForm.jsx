import {useState} from "react"; 
import {useEffect} from "react"; 
import { createClient } from "@supabase/supabase-js";
import "./AuthForm.css"

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

const AuthForm = ({ setUserID }) => {

    const [userView, setUserView] = useState("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(null)

    const switchToSignUp = () => {
        setUserView("signup")
        setLoginError(null)
        setEmail("")
    }

    const switchToLogin = () => {
        setUserView("login")
        setLoginError(null)
        setPassword("")
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
                setLoginError(error.message)
            }

            else {
                setEmail("")
                setPassword("")
                const { data: { user } } = await supabase.auth.getUser();
                setUserID(user?.id)
            }

        }

        else if (userView === "login") {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email, 
                password: password
            })

            if (!error) {
                setEmail("")
                setPassword("")
                setUserID(data.user.id)
            }

            if (error) {
                console.log(error)
                setLoginError(error.message)
            }
        }
    }
    
    return (
        <div className="auth-page">
        <div>
            <h1>MoodTrax</h1>
            <button id="changeMode" onClick={switchToSignUp}>Sign Up</button>
            <button id="changeMode" onClick={switchToLogin}>Log In</button>
            


            {userView === "login" && (
            <div id="login-page">
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                    <label>Email Address</label>
                    <input type="email" value={email} placeholder="Email Address" required onChange={(e)=>setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type="password" value={password} placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} minLength="8"/>
                    </div>
                    {loginError && (
                        <div className="errorBlock">
                            <span>❌ {loginError}</span>
                        </div>
                    )}
                    <button type="submit">Log In</button>
                </form>
                <p id="reroute">No account? <span className="rerouteLink" onClick={switchToSignUp}>Sign up</span></p>
            </div> 
        )}

            {userView === "signup" && (
            <div id="signup-page">
                <h2>Sign Up</h2>
                <form  onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" value={email} placeholder="Email Address" required onChange={(e) => setEmail(e.target.value)}/>
                        <label>Password</label>
                        <input type="password" value={password} placeholder="Password" required onChange={(e) => setPassword(e.target.value)} minLength="8"/>
                    </div>
                    {loginError && (
                        <div className="errorBlock">
                            <span>❌ {loginError}</span>
                        </div>
                    )}
                    <button id="submitButton" type="submit">Sign Up</button>
                </form>
                <div id="reroute">
                    <p>Have an account? <span onClick={switchToLogin} className="rerouteLink">Log in</span></p>
                </div>
            </div>
            )}
        </div>
        </div>



    )

}

export default AuthForm;