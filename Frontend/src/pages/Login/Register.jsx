import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdWatch } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  AiOutlineLock,
  AiOutlinePhone,
  AiOutlinePicture,
  AiOutlineUser,
} from "react-icons/ai";
import GoogleLogin from "../../components/headers/Social/GoogleLogin";
import { AuthContext } from "../../utilities/providers/AuthProvider";

const Register = () => {
    const navigate = useNavigate();
    const {signUp,updateUser,setError} = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  // Watch the password field to use it in confirmPassword validation
  const password = watch("password");

  const onSubmit = (values) => {
    setError("");
    signUp(values.email,values.password).then((result)=>{
      const user = result.user;
      if(user){
        return updateUser(values.name,values.photoURL)
        .then(() =>{
          const userImp = {
            name: user?.displayName,
            email:user?.email,
            photoURL:user?.photoURL,
            role:'user',
            gender:values.gender,
            phone:values.phone,
            address:values.address

          }
          if(user.email && user.displayName){
            return axios.post("http://localhost:5000/new-user", userImp)
            .then(() =>{
              navigate('/');
              return "Registration Successful"
            }).catch((err) => {
              throw new Error(err)
            })
          }
        }).catch((err) =>{
          setError(err.code);
          throw new Error(err)
        })
      }
    })
  };

  return (
    <div className="md:w-[80%] mx-auto my-36">
      <div className="flex justify-center items-center pt-14 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">
            Please Register
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-5">
              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="name">
                  <AiOutlineUser className="inline-block mr-2 mb-1 text-lg text-secondary" />
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  {...register("name", { required: true })}
                  className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary mt-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">Name is required.</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email">
                  <MdOutlineEmail className="inline-block mr-2 mb-1 text-lg text-secondary" />
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  {...register("email", { required: true })}
                  className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary mt-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">Email is required.</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-5">
              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password">
                  <AiOutlineLock className="inline-block mr-2 mb-1 text-lg text-secondary" />
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  {...register("password", { required: true })}
                  className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary mt-2"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">Password is required.</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-4">
                <label htmlFor="confirmPassword">
                  <AiOutlineLock className="inline-block mr-2 mb-1 text-lg text-secondary" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary mt-2"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-5">
              {/* Phone number Field */}
              <div className="mb-4">
                <label htmlFor="phoneNumber">
                  <AiOutlinePhone className="inline-block mr-2 mb-1 text-lg text-secondary" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter Your Phone Number"
                  {...register("phone", { required: true })}
                  className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary mt-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">Phone number is required.</p>
                )}
              </div>

              {/* Photo URL Field */}
              <div className="mb-4">
                <label htmlFor="photoUrl">
                  <AiOutlinePicture className="inline-block mr-2 mb-1 text-lg text-secondary" />
                  Photo URL
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  {...register("photoUrl")}
                  className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary mt-2"
                />
              </div>
            </div>

            {/* Gender and Address Fields */}
            <div className="mb-4">
              <label htmlFor="gender">
                <AiOutlineUser className="inline-block mr-2 mb-1 text-lg text-secondary" />
                Gender
              </label>
              <select
                {...register("gender", { required: true })}
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary mt-2"
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">Gender is required.</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="address">
                <HiOutlineLocationMarker className="inline-block mr-2 mb-1 text-lg text-secondary" />
                Address
              </label>
              <textarea
                {...register("address", { required: true })}
                rows="3"
                placeholder="Enter Address"
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary mt-2"
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm">Address is required.</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Register
              </button>
            </div>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link className="underline text-secondary ml-1" to="/login">
              Login
            </Link>
          </p>

          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
