import React from 'react';
import './page_styles.css';

const handleContinue = ()=>{
    return;
};

const setEmail = ()=>{
    return;
}

const setPassword = ()=>{

}

export default function Login() {
    return (
  
      <div className='bg'>
      <header>
          <h1>Please Login</h1>
      </header>
  
      <main>
          <section>
              <form className="auth-form" onSubmit={handleContinue} aria-labelledby="auth-form-title">
      
                  <div className="form-group email-group">
                      <label htmlFor="email" className="visually-hidden">Email Address</label>
                      <input
                          type="email"
                          id="email"
                          className="input-field"
                          value={"placeholder for email"}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          aria-required="true"
                      />
                  </div>
  
                  <div className="form-group">
                      <label htmlFor="password" className="visually-hidden">Password</label>
                      <input
                          type="password"
                          id="password"
                          className="input-field"
                          value={"placeholder for psw"}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          required
                          aria-required="true"
                      />
                  </div>
                  <button type="submit" className="continue-button" aria-label="Continue to create account">Continue</button>
  
                  <div className="error-message" aria-live="polite">
                      {/*error message if any */}
                  </div>
              </form>
          
          <p className="login-link">Don't have an account? <a href="/signup">Create an account</a></p>
          </section>
      </main>
      </div>
  
  
  
  
  
  
      
    )
  }
  