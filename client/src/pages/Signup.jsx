import {useState} from 'react'
import { MdMarkEmailRead } from "react-icons/md";
import './page_styles.css';

/*
 * 1) htmlFor: for focus the input field, when an input field is focused:
      - The cursor appears inside the input box, indicating that you can start typing.
      - The input box may get highlighted or styled differently, depending on the CSS.
      - Any content you type will go directly into that input field.
 *  
    step 1: capture user input change when enter info into form
    step 2: to track if form is submitted
    step 3: form submitted, a verification email is sent to user's email address
            - setup mongoDB, to temp store user info. in sever.js
 * 
 */



const setEmail = ()=>{
    return;
}

const setPassword = ()=>{

}

export default function Signup() {
  //step 1 
  const [formInfo, setFormInfo] = useState({}); //initialize to an empty obj, form obj contains all sorts info
  const handleChange = (event)=>{
    //console.log(event); -- React Synthetic Event system
    console.log(event.target.value); //-- to test if value change is captured
    //event access this "id" property from the "id" that I explicitly set in HTML , not from the React Synthetic Event system itself
    setFormInfo ({ //can't use "setFormInfo =", Because it is const, I can only call, not assign data
        ...formInfo,
        [event.target.id]: event.target.value, //find out which property is it, then assign the value from user input to this property
                                            //both from built-in JS event handling system
    });
};

  //step 2
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleContinue = (event)=>{
    event.preventDefault();
    setIsSubmitted(true);
};

  return (

    <div className='bg'>
        {isSubmitted ? (
            <div className='verification-message'>
                <div className='email-icon'><MdMarkEmailRead /></div>
                <h1>Check your email</h1>
                <p>We have sent a verification link to your email</p>
                <button>Resend Email</button>
            </div>
        ) : (
    <>
    <header>
        <h1>Create your account</h1>
    </header>

    <main>
        <section>
            <form className="auth-form" onSubmit={handleContinue} aria-labelledby="auth-form-title">
    
                <div className="form-group email-group">
                    <label htmlFor="email" className="visually-hidden">Email Address</label>
                    <input
                        type="email" //tells the browser to expect and validate the input as an email address w. built-in validation.
                        id="email"//allows the label or JS to reference this specific element.
                        className="input-field" 
                        // value={"placeholder for email"} //current value of the input field
                        onChange={handleChange}
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
                        // value={"placeholder for psw"}
                        onChange={handleChange}
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

        <p className="login-link">Already have an account? <a href="/login">Log in</a></p>
        </section>
    </main>
    </>
    )}
    </div>

    
  )
}
