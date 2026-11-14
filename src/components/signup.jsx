import React, { useState } from 'react'
import authservice from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authslice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Input from './input'
import Button from './button'
import './css/signup.css'

function Signup() {
    const nevigate = useNavigate()
    const [error, seterror] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const Create = async (data) => {
        seterror("")
        try {
            const account = await authservice.createAccount(data)
            if (account) {
                const userData = await authservice.getCurrentUser()
                if (userData) dispatch(login({ userData }))
                nevigate("/")
            }
        } catch (error) {
            seterror(error.message)
        }
    }

    return (
        <div className="signup-wrapper">
            <div className="signup-card">
                <div className="signup-logo">
                    <span>Daily-blog</span>
                </div>
                <h2 className="signup-title">Create your account</h2>
                <p className="signup-subtitle">
                    Already have an account?&nbsp;
                    <Link to="/login" className="signup-link">
                        Sign in
                    </Link>
                </p>
                {error && <p className="signup-error">{error}</p>}

                <form onSubmit={handleSubmit(Create)} className="signup-form">
                    <div className="signup-fields">
                        <Input
                            label="Name"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />

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
                            placeholder="Enter password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <Button bg="#111827" type="submit">
                            Create account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
