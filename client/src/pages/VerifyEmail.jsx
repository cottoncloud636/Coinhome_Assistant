import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';

export default function VerifyEmail() {
  const {token} = useParams(); //get token from url
  const [verificationMessage, setVerificationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); //track name input form if verification succeed

  // const navigate = useNavigate();

  useEffect(()=>{
    const verifyEmail = async ()=>{
      try {
        const response = await fetch(`/api/auth/verify/${token}`, {
          method: 'GET',
        });

        const data = await response.json();
        if (response.ok){
          setVerificationMessage('Your email has been verified successfully');
          //| optional, to redirect user to the 
          // setTimeout(()=>{
          //   navigate('/signup/verify');
          // }, 3000);
          setShowForm(true);
        } else{
          setVerificationMessage('Verification failed' + data.message);
        }
      } catch (error) {
        setVerificationMessage('Error during verification: '+ error.message);
      }finally{
        setIsLoading(false);
      }
    };

    verifyEmail();//call this verifyEmail function

  }, [token]); 


  return (
    <div>
    <div>
      <h1> Tell us about your self</h1>
      {isLoading ? (<p>Please be patient, I am working on it &gt;~&lt; ...</p>) : (<p>{verificationMessage}</p>)}
    </div>

    {showForm && (
      <form>
        <div>
          <label>First Name</label>
          <input type='text' placeholder='First Name' required/>
        </div>
        <div>
          <label>Last Name</label>
          <input type='text' placeholder='Last Name' required/>
        </div>
        <button type='submit'>submit </button>
      </form>
    )}
    </div>
  );
}
