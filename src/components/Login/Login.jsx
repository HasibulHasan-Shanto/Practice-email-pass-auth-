import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router";
import { auth } from "../../firebase/firebase.init";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const emailRef = useRef()
    const handleLogin = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        console.log('login done', email, password);
        setError('')
        setSuccess(false)
        event.target.reset()
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true)
            })
            .catch(error => {
                console.log(error.message);
                if (error.code === 'auth/user-not-found') {
                    setError('No account found with this email. Please register first.');
                }
                else if (error.code === 'auth/wrong-password') {
                    setError('Incorrect password. Please try again.');
                }
                else if (error.code === 'auth/invalid-email') {
                    setError('Please enter a valid email address.');
                }
                else if (error.code === 'auth/invalid-credential') {
                    setError('Invalid email or password.');
                }
                else if (error.code === 'auth/too-many-requests') {
                    setError('Too many attempts. Please try again later.');
                }
                else {
                    setError(error.message);
                }
            })
    }

    const handleResetPass = () => {
        const email = emailRef.current.value
        setError('');
        setSuccess(false);
        if (!email) {
            setError('Please enter your email address first');
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please Check your mail and update your password')
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
            })
        console.log('reset done');
    }
    const handleShowPass = () => {
        setShowPass(!showPass)
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input
                                    ref={emailRef}
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
                                        className="absolute right-7 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                    >
                                        {showPass ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div onClick={handleResetPass}>
                                    <a
                                        className="link link-hover">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="font-medium flex gap-2">
                                    You have a Account
                                    <p className="text-blue-500 underline font-bold">
                                        <Link to='/registration'>
                                            Sign up
                                        </Link>
                                    </p>
                                </div>
                                <button className="btn btn-neutral mt-4">Login</button>
                                {
                                    error && <p className="text-red-500 font-bold">{error}</p>
                                }
                                {
                                    success && <p className="text-green-500 font-bold">
                                        Login successful!
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

export default Login;