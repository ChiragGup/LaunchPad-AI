import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useParams, useSearchParams,useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from "react-toastify";

function ForgetPassword() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()



const password = watch("password");
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  // console.log(token)
  // console.log("Current URL:", window.location.href);
  // console.log("Token:", token);
  const onSubmit = async (data) => {
    console.log(data)
    try {
      const res = await axios.patch("http://localhost:5000/update-password", {
        password: data.password,
        forgetToken: token
      })
      toast.success(res.data.message)
      setTimeout(() => {
        navigate("/login")
      },2000);
      console.log(res)
    } catch (error) {
          toast.error(res.data.message)
      console.log(error)
    }
  }
  return (
    <div className="forgot-page">

      <div className='container '>
        <div className='row text-center d-flex justify-content-center align-items-center min-vh-100 rounded-4'>
          <div className='col-12 col-sm-10 col-md-7 col-lg-6 col-xl-5'>
            <div className='card shadow-sm border-0'>
              <div className='card-body '>
                <h4>
                  <span className="text-color">
                    <i className="fa-solid fa-rocket"></i>
                  </span>
                  LaunchPad <span className='text-color'>AI</span>
                </h4>
                <div class="rounded-circle d-flex justify-content-center align-items-center m-auto rocketIcon">
                  <span className="text-color"><i class="fa-solid fa-lock"></i></span>
                </div>
                <div>
                  <h5>Reset Your Password</h5>
                  <p className='pTag'>Enter your new password below to complete the reset process.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="email" className="form-label d-flex justify-start">
                        New Password
                      </label>

                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fa-regular fa-envelope"></i>
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          id="password"
                          {...register("password", {
                            required: "Passwsord is required",

                          })}
                        />
                      </div>
                      <div className='text-danger d-flex justify-start'>
                        <p>{errors.password?.message}</p>
                      </div>
                    </div>

                    {/* <div className="d-inline-block text-start pTag">
                      <p className="mb-1 "><span className="text-color "><i class="fa-regular fa-circle-check"></i></span> At least 8 characters</p>
                      <p className="mb-1"><span className="text-color "><i class="fa-regular fa-circle-check"></i></span> One uppercase letter</p>
                      <p className="mb-1"><span className="text-color "><i class="fa-regular fa-circle-check"></i></span> One number</p>
                      <p className="mb-1"><span className="text-color "><i class="fa-regular fa-circle-check"></i></span> One special character</p>
                    </div> */}
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label d-flex justify-start">
                      Confirm New Password
                    </label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-regular fa-envelope"></i>
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        id="confPassword"
                        {...register("confPassword", {
                          required: "Confirm Password is required",
                           validate: (value) =>
    value === password || "Passwords do not match",

                        })}
                      />
                    </div>
                    <div className='text-danger d-flex justify-start'>
                      <p>{errors.confPassword?.message}</p>
                    </div>
                  </div>

                  <div className='mt-3'>
                    <button type='submit' className='btn btn-primary-background fontBtnMain w-100'><i class="fa-solid fa-paper-plane"></i> Reset Password</button>
                  </div>
                </form>
                <div className="d-flex align-items-center my-4">
                  <hr className="flex-grow-1" />
                  <span className="mx-3 pTag">OR</span>
                  <hr className="flex-grow-1" />
                </div>
                <div >
                  <NavLink to="/login" className="text-color  text-decoration-none"><i class="fa-solid fa-arrow-left-long"></i> Back to login</NavLink>
                </div>
                <div className='mt-3'>
                  <p className='pTag'> <span className="text-color"><i class="fa-solid fa-people-roof"></i></span> Your account is safe with us.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ForgetPassword
