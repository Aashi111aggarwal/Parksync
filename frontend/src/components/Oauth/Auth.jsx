import React, { useState } from 'react'
import "./Oauth.css"
import { BsFillShieldLockFill , BsTelephoneFill} from "react-icons/bs";
import OtpInput from "otp-input-react"
import {CgSpinner} from "react-icons/cg"
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'
import {auth} from "../../firebase.config"
import {RecaptchaVerifier} from 'firebase/auth'
import { toast, Toaster } from "react-hot-toast";
import { signInWithPhoneNumber } from 'firebase/auth';

const Auth = () => {

  const [otp,setOtp]=useState("");
  const [ph,setph]=useState("");
  const [loading,setLoading]=useState(false);
  const [showOTP,setShowOTP]=useState(false);
  const [user,setUser]=useState(null);


  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  return (
    <div className="sec">
      <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {
        user?
        (<h2>
        👍Login Success
        </h2>)
        :
        ( <div className="inner_div">
<h1>Welcome to <br/>CODE A PROGRAM</h1>

{showOTP?
(<>
  <div className="lock">
  <BsFillShieldLockFill size={30} />
 </div>
  <label htmlFor="otp"
  className="lbl">
    Enter you otp
  </label>
  <OtpInput
  value={otp}
  onChange ={setOtp}
  OTPLength={6} 
  otpType="number" 
  disabled={false}
  autoFocus 
  className="otp-container">
    
   
  </OtpInput>
  <button  onClick={onOTPVerify}className="btn">{
    loading&&  <CgSpinner size={20} className="spin"></CgSpinner>
  }
  
  <span>Verify OTP</span></button>
</>):(<>
  <div className="lock">
  <BsTelephoneFill size={30} />
 </div>
  <label htmlFor=""
  className="lbl">
    Verify your phone number
  </label>
  <PhoneInput country={"in"} value={ph} onChange={setph}/>
  <button  onClick={onSignup}
    className="btn">{
    loading&&  <CgSpinner size={20} className="spin"></CgSpinner>
  }
  
  <span>Send code via SMS</span></button>
</>)}



        </div>)
      }



      </div>
    </div>
  )
}

export default Auth