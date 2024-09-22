import MyButton from '@/components/MyButton';
import MyInput from '@/components/MyInput';
import { useAuth, useUser } from '@/context/userContext';
import { useToast } from '@/hooks/use-toast';
import LoginSignup from '@/layouts/LoginSignup';
import { LoginSignupResponse } from '@/types';
import instance from '@/utils/axiosInstance';
import { getToastStyle } from '@/utils/utility';
import { validateEmail, validateName, validatePassword } from '@/utils/validation';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {setUser} = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate])

  const validateInputs = (): boolean => {
    const nameCheck = validateName(name);
    setNameError(nameCheck.error);
    const emailCheck = validateEmail(email);
    setEmailError(emailCheck.error);
    const passwordCheck = validatePassword(password);
    setPasswordError(passwordCheck.error);
    let confirmPasswordCheck: boolean = true;
    if (password !== confirmPassword) {
      confirmPasswordCheck = false;
      setConfirmPasswordError('Password does not match');
    }
    else setConfirmPasswordError('');
    return nameCheck.isValid && emailCheck.isValid && passwordCheck.isValid && confirmPasswordCheck;
  }

  const handleSignup = async () => {
    if (!navigator.onLine) {
      return toast({
        title: 'Connection Error',
        className: getToastStyle("error")
      })
    }
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const { data } = await instance.post<LoginSignupResponse>("/user/register", { name, email, password });
      if(data.success){
        setUser(data.data);
        toast({
          title: data.message,
          className: getToastStyle("success")
        });
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast({
          title: error.response.data.message,
          className: getToastStyle("error")
        });
      }
    }finally {
      setLoading(false);
    }
  }
  return (
    <LoginSignup>
      <h1 className="text-4xl font-bold m-4 text-primary-1 dark:text-dark-6">Sign-Up</h1>
      <div className="flex flex-col w-[90%] items-center">
        <MyInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          placeholder="Name"
          error={nameError}
          disabled={loading}
        />
        <MyInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="Email"
          error={emailError}
          disabled={loading}
        />
        <MyInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Password"
          type='password'
          error={passwordError}
          disabled={loading}
        />
        <MyInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm Password"
          placeholder="Confirm Password"
          type='password'
          error={confirmPasswordError}
          disabled={loading}
        />
        <MyButton
          onClick={handleSignup}
          title="SIGN-UP"
          loading={loading}
        />
        <div className='mt-3 w-full flex flex-col items-center'>
          <h1 className='text-xl font-bold mt-3'>OR</h1>
          <p className='text-xl'>Already have an account?
            <Link to={"/login"} className='ml-2 text-xl text-blue-500 font-bold'>Login</Link>
          </p>
        </div>
      </div>
    </LoginSignup>
  )
}

export default Signup