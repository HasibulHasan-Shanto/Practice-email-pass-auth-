import { Link } from "react-router";
import { auth } from "../../firebase/firebase.init";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Registration = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const handleCreateAccount = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        console.log('Registration done', email, password);
        setError('')
        setSuccess(false)
        event.target.reset()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!emailRegex.test(email)) {
            setError('Please Enter a valid email')
            return
        }
        else if (!passwordRegex.test(password)) {
            setError('Password must contain 8 characters, uppercase, lowercase, number and special character')
            return
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true)
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
                return
            })
    }

    const handleShowPass = () => {
        setShowPass(!showPass)
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Registration now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleCreateAccount}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="input"
                                    placeholder="Email" />
                                <label className="label">Password</label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={showPass ? 'text' : 'password'}
                                        className="input" placeholder="Password" />
                                    <button
                                        type="button"
                                        onClick={handleShowPass}
                                        className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                    >
                                        {showPass ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div className="font-medium flex gap-2 mt-1">
                                    You have a Account
                                    <p className="text-blue-500 underline font-bold">
                                        <Link to='/login'>
                                            Sign In
                                        </Link>
                                    </p>
                                </div>
                                <button
                                    className="btn btn-neutral mt-4">
                                    Registration
                                </button>
                                {
                                    error && <p className="text-red-500 font-bold">{error}</p>
                                }
                                {
                                    success && <p className="text-green-500 font-bold">
                                        Registration successful!
                                    </p>
                                }
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;