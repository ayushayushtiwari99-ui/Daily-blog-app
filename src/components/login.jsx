import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authslice'
import { Button, Input } from './index'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import './css/Login.css'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, seterror] = useState("")

    const userlogin = async (data) => {
        seterror("")
        try {
            const session = await authservice.login(data)
            if (session) {
                const userData = await authservice.getCurrentUser()
                if (userData) dispatch(login({ userData }))
                navigate("/")
            }
        } catch (error) {
            seterror(error.message)
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="login-logo">
                    Daily-blog
                </div>
                <h2 className="login-title">Sign in to your account</h2>
                <p className="login-subtitle">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className="login-link">
                        Sign Up
                    </Link>
                </p>
                {error && <p className="login-error">{error}</p>}
                <form onSubmit={handleSubmit(userlogin)} className="login-form">
                    <div className="login-fields">
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                            })}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <Button bg="#111827" type="submit">
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
