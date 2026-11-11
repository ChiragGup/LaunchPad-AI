import React, { useEffect, useState } from 'react'
import "../style/signUp.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";



function SignUp() {
  

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
      getValues,
      watch,
    formState: { errors },
  } = useForm()

const onSubmit = async(data) => {
  console.log(data);
  try {
const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
  fullName: data.fullName,
  email: data.email,
  password: data.password,
});
toast.success("Account created successfully!");
setTimeout(() => {
  navigate("/login")
}, 2000);
console.log(res.data)

} catch (error) {
  console.log(error)
if(error.response?.status === 409){
  toast.error("Email already exists!");
}
}


};

const passwordData = watch("password");
const ConfirmData = watch("confirm");

  return (
    <div>
      {/* container */}
      <div className='container py-5'>
        {/* row */}
        <div className='row'>
          {/* left */}
          <div className='col-lg-6 leftData'>
            <span className="badge rounded-pill text-bg-color px-2 py-2 mb-2">
              AI Powered StartUp Platform
            </span>
            <div>
              <h2>
                Star Your StartUp
              </h2>

              <h2 className="hero-title mb-2">
                Journey <span className="text-color">Today</span>
              </h2>

              <p className="pTag">
                Join thousands of innovators, dreamers, and builders who are turning ideas into successful startups with the power of AI.
              </p>
            </div>
            {/* card 1 */}

            <div>
              <div className="border-0 rounded-4 p-3">
                <div className="d-flex align-items-center">
                  <div className="text-color me-3 backColor_1">
                    <i className="fa-solid fa-lightbulb fs-3"></i>
                  </div>

                  <div className="p-0">
                    <h6>AI-Powered Ideas</h6>
                    <p className="mb-0 pTag">
                      Generate, validate, and refine startup ideas using advanced AI tools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-0 rounded-4 p-3 ">
                <div className="d-flex align-items-center">
                  <div className="text-color me-3 backColor_1">
                    <i className="fa-solid fa-users fs-3"></i>
                  </div>

                  <div className="p-0">
                    <h6>Find Co-Founders</h6>
                    <p className="mb-0 pTag">
                      Connect with talented and like-minded people to build your dream team.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-0 rounded-4 p-3">
                <div className="d-flex align-items-center">
                  <div className="text-color me-3 backColor_1">
                    <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>

                  <div className="p-0">
                    <h6>Validate with AI</h6>
                    <p className="mb-0 pTag">
                      Receive AI-powered market insights & startup validation to make smarter decisions.
                    </p>
                  </div>
                </div>
              </div>

            </div>
            <div className="card stats-card shadow mt-3">
              <div className="card-body">
                <p className="pTag mb-0">
                  Join <span className="text-color fw-bold">2,500+</span> innovators building the future
                </p>
              </div>
            </div>
          </div>
          {/* right */}
          <div className='col-lg-6'>
            <div className='card shadow p-2'>
              <div className='card-body'>
                {/* heading */}
                <div className='text-center'>
                  <h5 className='fw-semibold'>Create Your Account</h5>
                  <p className='pTag'>Sign up today and start building the future with LaunchPad AI.</p>
                </div>
                {/* google and github */}
                {/* <div className='d-flex justify-content-center gap-2 googleGit'>
                 
                  <div className='shadow-sm'>
                    <button className='googleData'><span><i class="fa-brands fa-google"></i></span> Continue with Google</button>

                  </div>
                
                  <div className='shadow-sm'>
                    <button className='googleData'><span><i class="fa-brands fa-github"></i></span> Continue with GitHub</button>
                  </div>
                </div> */}
                {/* <div className="d-flex align-items-center my-4">
                  <hr className="flex-grow-1" />
                  <span className="mx-3 pTag">Or Sign up with Email</span>
                  <hr className="flex-grow-1" />
                </div> */}
                {/* form */}
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='row'>
                      <div className="col-md-6">
                        <label htmlFor="fullName" className="form-label">
                          Full Name
                        </label>

                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="fa-regular fa-address-card"></i>
                          </span>

                          <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            placeholder="Enter your full name"
                            {...register("fullName", {
                              required: "Full name is required",
                            })}
                          />


                        </div>
                        <div>
                          <p className="text-danger">
                            {errors.fullName?.message}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label for="email" class="form-label">Email Address</label>

                        <div className="input-group">
                          <span className="input-group-text">
                            <i class="fa-regular fa-envelope"></i>
                          </span>

                          <input {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Please enter a valid email address",
                            },
                          })} type="email" class="form-control" id="email" placeholder='Enter your email address' />
                        </div>
                        <div>
                          <p className="text-danger">
                            {errors.email?.message}
                          </p>
                        </div>
                      </div>
                      <div className="col-12 mt-2">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>

                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="fa-solid fa-lock"></i>
                          </span>

                          <input
                            {...register("password", {
                              required: "Password is required"
                            })}
                         type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                          />
                           <span className="input-group-text text-color"   onClick={() => {
    if (!passwordData) return;

    setShowPassword(!showPassword);
  }}>
                       {showPassword === true ? <i class="fa-solid fa-toggle-on"></i>:<i class="fa-solid fa-toggle-off"></i>}
                          </span>
                        </div>
                        <div>
                          <p className="text-danger">
                            {errors.password?.message}
                          </p>
                        </div>
                      </div>

                    </div>
                    <div className="col-12 mt-2">
                      <label htmlFor="password" className="form-label">
                        Confirm Password
                      </label>

                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fa-solid fa-lock"></i>
                        </span>

                        <input
                          type={showConfirmPassword?"text":"password"}
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Confirm your password"
                          {...register("confirm", {
                            required: "Confirm Password is required",
                            validate:(value)=>{
                              return value === passwordData || "Password do not match"

                            }
                          })}
                        />
 <span className="input-group-text text-color" 
                             onClick={() => {
    if (!ConfirmData) return;

    setShowConfirmPassword(!showConfirmPassword);
  }}>
                       {showConfirmPassword === true ? <i class="fa-solid fa-toggle-on"></i>:<i class="fa-solid fa-toggle-off"></i>}
                          </span>
                      </div>
                      <div>
                        <p className="text-danger">
                          {errors.confirm?.message}
                        </p>
                      </div>
                      <div className="col-12 mt-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="terms"
                            {...register("terms", {
                              required: "You must agree to the Terms of Service and Privacy Policy.",
                            })}
                          />

                          <label className="form-check-label" htmlFor="terms">
                            I agree to the <NavLink className="text-color  text-decoration-none" to = "/terms">Terms of Service</NavLink > and <NavLink to = "/privacy" className="text-color  text-decoration-none">Terms of Service</NavLink>.
                          </label>
                        </div>

                        <p className="text-danger">
                          {errors.terms?.message}
                        </p>
                      </div>

                      <div className='mt-3 text-center'>
                        <button className='btn btn-primary-background fontBtnMain w-100' type='submit'>
                          Create Account
                        </button>
                      </div>

                      <div className="text-center mt-2">
                        <p className="pTag">
                          Already have an account?{" "}
                          <NavLink to="/login" className="text-color  text-decoration-none">
                            Login
                          </NavLink>
                        </p>
                      </div>


                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
