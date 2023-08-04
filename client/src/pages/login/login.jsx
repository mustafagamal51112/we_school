import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';
import { login, signUp } from '../../functions/auth';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    invitationCode: '',
    role: '',
  });

  const toastConfig = {
    position: 'bottom-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6).max(12).required('Password is required'),
    ...(isLogin
      ? {}
      : {
          firstName: Yup.string().required('First Name is required'),
          lastName: Yup.string().required('Last Name is required'),
          invitationCode: Yup.string().min(8).required('Invitation Code is required'),
          role: Yup.string().required('Please select a role'),
        }),
  });

  const validateForm = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      toast.dismiss(); // Dismiss any previous error toasts
    } catch (error) {
      error.inner.forEach((err) => {
        toast.error(err.message, toastConfig);
      });
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    
    if (await schema.isValid(formData)) {
      const loadingToast =  toast.loading("loading",toastConfig)
      const { msg, error } = isLogin ? await login(formData) : await signUp(formData);

      if (error) {
        toast.error(error, toastConfig);
        toast.dismiss(loadingToast)


      } else {
        toast.success(msg, toastConfig);
        toast.dismiss(loadingToast)


      }
      



      
    }
  };

  const handleTogglePasswordVisibility = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handleChangeMood = () => {
    setIsLogin(!isLogin);
    setFormData({})
  };

  return (
    <main className="h-[100vh]">
      <img className="absolute top-0 right-0 z-[-1] w-full drop-shadow-xl" src="/assets/wave.svg" alt="" />

      <section className="h-full mt-20 capitalize">
        <h1 className="text-center text-3xl capitalize text-white">{isLogin ? 'login' : 'sign up'}</h1>

        <div className="flex flex-col lg:flex-row-reverse w-[70%]  lg:h-[550px]  m-auto bg-white drop-shadow-lg rounded-lg overflow-hidden mt-20">
          <div className=" h-full lg:w-[80%]">
            <img src="/assets/student.jpg" alt="" className="h-full w-full" />
          </div>

          <section className="w-full p-5 flex flex-col items-center justify-around my-8">
            <h1 className="text-center text-3xl font-semibold uppercase">We School</h1>

            <form
              action=""
              className="flex flex-col lg:flex-row w-full flex-wrap gap-7 p-5 "
              onSubmit={handleSubmit}
            >
              {isLogin ? (
                <>
                  <div className="border-b border-bl w-full">
                    <input
                      className="w-full outline-none bg-transparent text-main"
                      type="text"
                      placeholder="Email"
                      name="email"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex border-b border-bl w-full">
                    <input
                      className="w-full outline-none bg-transparent text-main"
                      type={isShowPassword ? 'text' : 'password'}
                      placeholder="Password"
                      name="password"
                      onChange={handleInputChange}
                    />
                    <h1 className="text-gray-500 hover:text-main text-lg" onClick={handleTogglePasswordVisibility}>
                      {isShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </h1>
                  </div>
                </>
              ) : (
                <>
                <div className="border-b border-bl w-full lg:w-[45%]">
                    <input
                      className="w-full outline-none bg-transparent text-main"
                      type="text"
                      placeholder="Email"
                      name="email"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex border-b border-bl w-full lg:w-[45%]">
                    <input
                      className="w-full outline-none bg-transparent text-main"
                      type={isShowPassword ? 'text' : 'password'}
                      placeholder="Password"
                      name="password"
                      onChange={handleInputChange}
                    />
                    <h1 className="text-gray-500 hover:text-main text-lg" onClick={handleTogglePasswordVisibility}>
                      {isShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </h1>
                  </div>
                  <div className="border-b border-bl w-full lg:w-[45%]">
                    <input
                      className="w-full outline-none bg-transparent text-main"
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="border-b border-bl w-full lg:w-[45%]">
                    <input
                      className="w-full outline-none bg-transparent text-main"
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="border-b border-bl w-full ">
                    <input
                      className="w-full outline-none bg-transparent text-main"
                      type="text"
                      placeholder="invit Code"
                      name="invitationCode"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full">
                    <select
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-md px-8 py-2 pr-8 focus:text-main appearance-none"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select Your Role
                      </option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none p-2">
                      <FaChevronDown className="w-5 h-5 text-main" />
                    </div>
                  </div>
                </>
              )}

              <button className="w-full bg-main text-white p-2 mx-3 rounded-lg capitalize">
                {isLogin ? 'login' : 'sign up'}
              </button>

              <div
                onClick={handleChangeMood}
                className="lg:w-1/2 m-auto bg-main text-white p-2 rounded-lg capitalize text-center cursor-pointer"
              >
                {isLogin ? 'or sign up' : 'or login'}
              </div>
            </form>
          </section>
        </div>

        <div></div>
      </section>
    </main>
  );
};

export default Login;