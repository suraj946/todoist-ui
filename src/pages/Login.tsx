import MyButton from '@/components/MyButton';
import MyInput from '@/components/MyInput';
import { useAuth, useUser } from '@/context/userContext';
import { useToast } from '@/hooks/use-toast';
import LoginSignup from '@/layouts/LoginSignup';
import { LoginSignupResponse } from '@/types';
import instance from '@/utils/axiosInstance';
import { getToastStyle } from '@/utils/utility';
import { validateEmail, validatePassword } from '@/utils/validation';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuth();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const {toast} = useToast();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailCheck = validateEmail(e.target.value);
    setEmailError(emailCheck.error);
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const passwordCheck = validatePassword(e.target.value);
    setPasswordError(passwordCheck.error);
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate])

  const validateInputs = (): boolean => {
    const emailCheck = validateEmail(email);
    setEmailError(emailCheck.error);
    const passwordCheck = validatePassword(password);
    setPasswordError(passwordCheck.error);
    return emailCheck.isValid && passwordCheck.isValid;
  }
  const handleLogin = async() => {
    if(!navigator.onLine) {
      return toast({
        title: 'Connection Error',
        className: getToastStyle("error")
      })
    }
    if (!validateInputs()) return;
    try {
      setLoading(true);
      const { data } = await instance.post<LoginSignupResponse>("/user/login", { email, password });
      if(data.success){
        setUser(data.data);
        toast({
          title: data.message,
          className: getToastStyle("success")
        });
        navigate("/");
      }
    } catch (error) {
      if(error instanceof AxiosError && error.response) {
        toast({
          title: error.response.data.message,
          className: getToastStyle("error"),
        });
      }
    }finally {
      setLoading(false);
    }
  }
  return (
    <LoginSignup>
      <h1 className="text-4xl font-bold m-4 text-primary-1 dark:text-dark-6">Login</h1>
      <div className="flex flex-col w-[90%] items-center">
        <MyInput
          value={email}
          onChange={handleChangeEmail}
          label="Email"
          placeholder="Email"
          error={emailError}
          disabled={loading}
        />
        <MyInput
          value={password}
          onChange={handleChangePassword}
          label="Password"
          placeholder="Password"
          type='password'
          error={passwordError}
          disabled={loading}
        />
        <MyButton
          onClick={handleLogin}
          title="Login"
          loading={loading}
        />
        <div className='mt-3 w-full flex flex-col items-center'>
          <Link
            className='text-xl text-blue-500 font-bold mt-3 self-end'
            to={"/forget-password"}
          >Forget Password</Link>
          <h1 className='text-xl font-bold mt-3'>OR</h1>
          <p className='text-xl'>Don't have an account?
            <Link to={"/signup"} className='ml-2 text-xl text-blue-500 font-bold'>Signup</Link>
          </p>
        </div>
      </div>
    </LoginSignup>
  )
}

export default Login