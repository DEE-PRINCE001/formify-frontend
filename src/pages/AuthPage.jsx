import React, { useEffect, useState } from 'react';
import { authService } from '../api/authService';
import logo from '../assets/logo.svg'; 
import Button from '../components/ui/Button';
import Input from '../components/Input';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthPage = ({ mode }) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  useEffect(() => {
    const oauthToken = searchParams.get('token');
    if (oauthToken) {
      authService.saveToken(oauthToken);
      navigate('/dashboard');
    }
  }, [searchParams, navigate]);


  const handleOAuthLogin = () => {

    window.location.href = 'https://formify-1-ozy6.onrender.com/oauth2/authorization/google'; 
  };


  const handleChange = (e) => {
    setError('')
    if (!isLogin && formData.password.length < 6){ setError("Password must contain at least 6 character")}
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await authService.login(formData);
        toast.success('Login successful! Redirecting...');
        navigate('/dashboard');
      } else {

        if (formData.password.length < 6){
          setError("Password must contain at least 6 character!");
          return;
          
        }

        await authService.register(formData);
        toast.success('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (err) {
      
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
<div className="flex flex-col bg-[#141F33] py-10 items-center w-full justify-start min-h-screen max-sm:px-2">
    <div className="flex flex-col items-center justify-center space-y-5 p-2 text-white transition-all duration-300">
        <img src={logo} alt="Formify Logo" className="w-15 h-15 " />
      <h2 className='text-4xl font-bold m-0 mb-1'>{isLogin ? 'Login to Formify' : 'Create an Account'}</h2>
      <p className='text-lg text-white/70 text-center'>{isLogin ? 'Welcome back! Please enter your credentials.' : 'Join Formify today! Please fill in the details below.'}</p>
    </div>

    <div className="space-y-4 rounded-xl sm:w-full lg:w-125 mt-3 bg-white/5 shadow-sm border-2 border-white/20 max-sm:p-5 p-10">

        <Button onClick={handleOAuthLogin} 
        className="w-full h-15 text-lg! font-bold!" variant='secondary'>Continue with Google</Button>
        <Button onClick={handleOAuthLogin}
        className="w-full h-15 text-lg! font-bold!"
        >Continue with Apple</Button>

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
          <div className='flex justify-between items-center'>
            <label>Password:</label>
            <span onClick={() => navigate("/forgot-password")} className="text-blue-500 text-sm hover:underline cursor-pointer">
        Forgot Password
      </span>
          </div>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="At least 6 characters"
          />
        </div>
        {error && <div className='text-red-500 mb-3.5 text-left'>{error}</div>}
        <Button type="submit" className={"w-full h-12 text-lg! font-bold!"} 
        disabled={loading}
        >{loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}</Button>
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