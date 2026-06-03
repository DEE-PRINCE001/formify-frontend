import React, { useState } from 'react';
import { authService } from '../api/authService';
import logo from '../assets/logo.svg'; 
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';

const AuthPage = ({ mode }) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await authService.login(formData);
        navigate('/dashboard');
        alert('Login successful! Redirecting...');
      } else {
        await authService.register(formData);
        alert('Registration successful! Please log in.');
        setIsLogin(true); // Switch to login view
      }
    } catch (err) {
      // Catching the clean JSON error from your Spring backend
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'An error occurred.');
      } else {
        setError('Network error. Seems the Backend is not running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="flex flex-col bg-black mt-4 items-center w-full justify-start min-h-screen">
    <div className="flex flex-col items-center justify-center space-y-5 p-2 text-white transition-all duration-300">
        <img src={logo} alt="Formify Logo" className="w-15 h-15 " />
      <h2 className='text-4xl font-bold m-0 mb-1'>{isLogin ? 'Login to Formify' : 'Create an Account'}</h2>
      <p className='text-lg text-white/70 text-center'>{isLogin ? 'Welcome back! Please enter your credentials.' : 'Join Formify today! Please fill in the details below.'}</p>
    </div>

    <div className="space-y-4 rounded-xl sm:w-full lg:w-125 mt-3 bg-white/5 shadow-sm border-2 border-white/20 max-sm:p-5 p-10">
      
      {error && <div className='text-red-500 mb-2.5 text-center'>{error}</div>}

        <Button text={"Continue with Google"} bg={"bg-white"} 
        size={"w-full h-15 text-lg font-bold"} 
        color={"secondary"}/>
        <Button text={"Continue with Apple"} bg={"bg-black"} 
        size={"w-full h-15 text-lg font-bold"} otherStyles={"border-2 border-white/30"} 
        />

        <div className="flex items-center mb-3">
          <hr className="grow border-t border-white/15" />
          <span className="mx-2 text-white/50">or</span>
          <hr className="grow border-t border-white/15" />
        </div>
      <form className="space-y-4 text-white" onSubmit={handleSubmit}>
        
        <div className="flex flex-col space-y-1">
          <label>Email:</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label>Password:</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="At least 6 characters"
          />
        </div>
        <Button type="submit" text={loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')} bg={"bg-blue-600"} size={"w-full h-12 text-lg font-bold"} disabled={loading} />
      </form>

      <p onClick={() => {navigate( isLogin ? "/login" : "/register");
      setIsLogin(!isLogin);
        setError('')
      }} className="text-blue-500 hover:underline cursor-pointer text-center mt-4">
        {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
      </p>
    </div>
</div>
  );
};

export default AuthPage;