"use client";
import Image from 'next/image';
import loginImage from '../../public/imgs/login.jpg';
import { useForm } from 'react-hook-form';
import { NoAuthApiCaller } from '../utils/apis';
import { redirect } from 'next/navigation'
import Link from 'next/link';

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const submitLogin = async (data) => {
        const res = await NoAuthApiCaller.post('/register', data)
        if(res){
            setTimeout(() => {
                redirect('/login')
            }, 1000);
        }
    }

    return (
        <main  className="container">
            <div className="d-flex justify-content-center mt-3">
                <Image src={loginImage} alt="Logins"  className="login-img" />
            </div>
            <div className="d-flex justify-content-center mt-3">
                <h1>Register</h1>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <form className="login-form" onSubmit={handleSubmit((data) =>submitLogin(data))}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control form-control-lg" id="email" placeholder="name@example.com"
                        {...register("email",
                            {required: true,}
                        )}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control form-control-lg" id="username" placeholder="Username"
                        {...register("username",
                            {required: true,}
                        )}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="text" className="form-control form-control-lg" id="password" placeholder="***********"
                        {...register("password",
                            {required: true,}
                        )}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                        <input type="confirm_password" className="form-control form-control-lg" id="confirm_password" placeholder="***********" 
                        {...register("confirm_password", 
                            {required: true,}
                        )}/>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-success btn-lg w-100">Register</button>
                        <div className='separator'>OR</div>
                        <Link className='btn btn-primary btn-lg w-100' href="/register"> Login</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}