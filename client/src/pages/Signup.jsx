import React from 'react'
import './page_styles.css';

/*
 * 1) htmlFor: for focus the input field, when an input field is focused:
      - The cursor appears inside the input box, indicating that you can start typing.
      - The input box may get highlighted or styled differently, depending on the CSS.
      - Any content you type will go directly into that input field.
 *  
 * 
 */
const handleContinue = ()=>{
    return;
};

const setEmail = ()=>{
    return;
}

const setPassword = ()=>{
    
}

export default function Signup() {
  return (
    <div className='bg'>

       <h1>Create your account</h1>

       <form className="signup-form" onSubmit={handleContinue}>
       
        <div className="form-group">
            <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value="placeholder for value"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
        </div>


        <div className="form-group">
            <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value="placeholder for psw"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="button" className="password-toggle">👁️</button>
                </div>
                <button type="submit" className="continue-button">Continue</button>
       </form>

        <p className="login-link">Already have an account? <a href="/login">Log in</a></p>
    </div>






    
  )
}
