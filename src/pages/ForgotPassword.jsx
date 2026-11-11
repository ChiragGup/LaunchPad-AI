import React from 'react'
import "../style/forgetPassword.css"
import { NavLink, useNavigate, useNavigation } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from "react-toastify";

function ForgotPassword() {
  const navigate = useNavigate()

const onSubmit = async (data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/forgot-password`,
      {
        email: data.email,
      }
    );

    console.log(res);
        toast.success(res.data.message);
   
  } catch (error) {
    console.log(error.response);
      const message =
      error.response?.data?.message || "Something went wrong";
      toast.error(message);
      }
};

  const {
    register,
    handleSubmit,
      watch,
    formState: { errors },
  } = useForm()
  
  return (
    <div className="forgot-page">

      <div className='container '>
        <div className='row text-center d-flex justify-content-center align-items-center min-vh-100 rounded-4'>
          <div className='col-12 col-sm-10 col-md-7 col-lg-6 col-xl-5'>
            <div className='card shadow-sm border-0'>
              <div className='card-body'>
                <h4>
                  <span className="text-color">
                    <i className="fa-solid fa-rocket"></i>
                  </span>
                  LaunchPad <span className='text-color'>AI</span>
                </h4>
                <div class="rounded-circle d-flex justify-content-center align-items-center m-auto rocketIcon">
                  <span className="text-color"><i class="fa-solid fa-house-lock"></i></span>
                </div>
                <div>
                  <h5>Forgot Password?</h5>
                  <p className='pTag'>No worries! Enter your registered email address and we'll send you a link to reset your password.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="email" className="form-label d-flex justify-start">
                        Email Address
                      </label>

                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fa-regular fa-envelope"></i>
                        </span>

                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          {...register("email",{
                          required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Please enter a valid email address",
                            },
                          })}
                        />
                      </div>
                      <div className='text-danger d-flex justify-start'>
                        <p>{errors.email?.message}</p>
                      </div>
                    </div>
                  </div>
                  <div className='mt-3'>
                    <button type='submit'  className='btn btn-primary-background fontBtnMain w-100'><i class="fa-solid fa-paper-plane"></i> Send Reset Link </button>
                  </div>
                </form>
                <div className="d-flex align-items-center my-4">
                  <hr className="flex-grow-1" />
                  <span className="mx-3 pTag">OR</span>
                  <hr className="flex-grow-1" />
                </div>
                <div >
                 <NavLink to ="/login" className="text-color  text-decoration-none"><i class="fa-solid fa-arrow-left-long"></i> Back to login</NavLink>
                </div>
                <div className='mt-3'>
                  <p className='pTag'> <span className="text-color"><i class="fa-solid fa-people-roof"></i></span> We'll never share your email with anyone else.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
