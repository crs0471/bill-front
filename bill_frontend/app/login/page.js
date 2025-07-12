"use client";
import Image from 'next/image';
import loginImage from '../../public/imgs/login.jpg';
import { useForm } from 'react-hook-form';
import { NoAuthApiCaller } from '../utils/apis';
import { redirect } from 'next/navigation'
import Link from 'next/link';
import { AsyncLocalStorageHelper } from '../utils/helper';

export default function Login() {
    console.log('process.env: ', process.env)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const setLocalStorageAccess = async (data) => {
        await AsyncLocalStorageHelper.setItem('accessToken', data.access)
        await AsyncLocalStorageHelper.setItem('refreshToken', data.refresh)
    }

    const submitLogin = async (data) => {
        const res = await NoAuthApiCaller.post('/login', data)
        console.log('res: ', res)
        if(res){
            await setLocalStorageAccess(res.data); 
            redirect('/dashboard');
        }
    }

    return (
        <main  className="container">
            <div className="d-flex justify-content-center mt-3">
                <Image src={loginImage} alt="Logins"  className="login-img" />
            </div>
            <div className="d-flex justify-content-center mt-3">
                <h1>Login</h1>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <form className="login-form" onSubmit={handleSubmit((data) =>submitLogin(data))}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email | Username</label>
                        <input type="text" className="form-control form-control-lg" id="email" placeholder="name@example.com || Username"
                        {...register("email",
                            {required: true,}
                        )}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control form-control-lg" id="password" placeholder="***********" 
                        {...register("password", 
                            {required: true,}
                        )}/>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary btn-lg w-100 mb-2">Login</button>
                        <div className='separator'>OR</div>
                        <Link className='btn btn-success btn-lg w-100' href="/register"> Register</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}