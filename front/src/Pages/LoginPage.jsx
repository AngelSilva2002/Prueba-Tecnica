import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {user, singin, errors: SinginErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate()


  const onSubmit = handleSubmit((data) => {
    console.log(data);
    singin(data);
  });

  useEffect(() => {
    if(isAuthenticated) navigate('/profile')
    }, [isAuthenticated])

    console.log(user)

  return (
    <div className="flex h-screen items-center justify-center">
    <div>
        {SinginErrors.length > 0 && (
          SinginErrors.map((error, i) => 
            <div className='bg-red-500 p-2 text-white' key={i}>
              {error}
            </div>
          )
        )}
      </div>
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-white	   text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit}>
          <input 
            className={`w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 ${errors.email ? 'border-red-500' : ''}`}
            type="email" 
            placeholder='Email' 
            {...register("email", { required: "Email is required" })} 
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          
          <input 
            className={`w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 ${errors.password ? 'border-red-500' : ''}`}
            type="password" 
            placeholder='Password' 
            {...register("password", { required: "Password is required" })} 
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          
          <button type='submit' className='w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2'>
            Login
          </button>
        </form>
        <p className="text-white flex gap-x-2 justify-between">
          Don't have an account? <Link className="text-sky-500" to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
