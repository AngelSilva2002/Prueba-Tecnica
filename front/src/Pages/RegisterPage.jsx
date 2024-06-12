
import { useForm } from 'react-hook-form'
import { registerRequest } from "../api/auth"
import { useAuth } from '../Context/AuthContext'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
function RegisterPage() {


    const { register, handleSubmit } = useForm()
    const { singup, user, isAuthenticated, errors: Autherrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/profile')
    }, [isAuthenticated])

    console.log(user)
    return (


        <div className="flex h-screen items-center justify-center">
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                <h1 className="text-white text-2xl font-bold">Register</h1>
                {
                    Autherrors.map((error, i) =>
                        <div className='bg-red-500 p-2 text-white' key={i}>
                            {error}
                        </div>
                    )
                }
                <form onSubmit={handleSubmit(async values => {
                    singup(values)

                })}>
                    <input className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        type="text" placeholder='Username' {...register("username", { required: true })} />


                    <input className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        type="email" placeholder='Email' {...register("email", { required: true })} />

                    <input className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        type="password" placeholder='Password' {...register("password", { required: true })} />


                    <h2 className='text-white text-center font-weight: 1000'>Skills</h2>
                    <div className="h-0.5 bg-white my-4"></div>
                    <div className="flex items-center">
                        <p className='text-white'>Python</p>
                        <input className='max-w-[100px] bg-zinc-700 text-white px-4 py-2 rounded-md ml-2 mb-2 mt-2'
                            type="number" max="5" min="0" placeholder='0' {...register("python")} />
                    </div>

                    <div className="flex items-center">
                        <p className='text-white'>Java</p>
                        <input className='max-w-[100px] bg-zinc-700 text-white px-4 py-2 rounded-md ml-2 mb-2 mt-2'
                            type="number" max="5" min="0" placeholder='0' {...register("java")} />
                    </div>

                    <div className="flex items-center">
                        <p className='text-white'>JavaScript</p>
                        <input className='max-w-[100px] bg-zinc-700 text-white px-4 py-2 rounded-md ml-2 mb-2 mt-2'
                            type="number" max="5" min="0" placeholder='0' {...register("js")} />
                    </div>



                    <div className="flex items-center">
                        <p className='text-white'>C</p>
                        <input className='max-w-[100px] bg-zinc-700 text-white px-4 py-2 rounded-md ml-2 mb-2 mt-2'
                            type="number" max="5" min="0" placeholder='0' {...register("C")} />
                    </div>



                    <div className="flex items-center">
                        <p className='text-white'>C++</p>
                        <input className='max-w-[100px] bg-zinc-700 text-white px-4 py-2 rounded-md ml-2 mb-2 mt-2'
                            type="number" max="5" min="0" placeholder='0' {...register("Cplus")} />
                    </div>






                    <button className='w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2' type='submit'>
                        Register
                    </button>
                </form>

                <p className="text-white flex gap-x-2 justify-between">
                    Do have an account? <Link className="text-sky-500" to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage