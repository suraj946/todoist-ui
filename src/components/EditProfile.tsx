import { useUser } from '@/context/userContext'
import { useToast } from '@/hooks/use-toast'
import { ResponseWithoutData } from '@/types'
import instance from '@/utils/axiosInstance'
import { getToastStyle } from '@/utils/utility'
import { validateEmail, validateName } from '@/utils/validation'
import { AxiosError } from 'axios'
import React, { Dispatch, SetStateAction, useState } from 'react'
import MyButton from './MyButton'
import MyDialog from './MyDialog'
import MyInput from './MyInput'

interface EditProfileProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
} 

const EditProfile: React.FC<EditProfileProps> = ({
  isOpen,
  setIsOpen
}) => {
  const {setUser, user} = useUser();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const {toast} = useToast();
  
  const validateInputs = (): boolean => {
    const nameCheck = validateName(name);
    setNameError(nameCheck.error);
    const emailCheck = validateEmail(email);
    setEmailError(emailCheck.error);

    return nameCheck.isValid && emailCheck.isValid;
  }
  const handleSave = async() => {
    if(!navigator.onLine) {
      return toast({
        title: 'Connection Error',
        className: getToastStyle("error")})
    }
    if (!validateInputs()) return;
    try {
      setLoading(true);
      const { data } = await instance.put<ResponseWithoutData>("/user/single", { name, email });
      if(data.success){
        toast({
          title: data.message,
          className: getToastStyle("success")
        });
        if(user){
          setUser({...user, name, email});
        }
        setIsOpen(false);
      }
    } catch (error) {
      if(error instanceof AxiosError && error.response) {
        toast({
          title: error.response.data.message,
          className: getToastStyle("error")
        });
      }
    }finally {
      setLoading(false);
    }
  }

  const onModalDismiss = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setNameError('');
    setEmailError('');
  }
  return (
    <MyDialog 
      isOpen={isOpen} 
      setIsOpen={setIsOpen}
      header='Edit Profile'
      footer={
        <MyButton
          title="Save"
          onClick={handleSave}
          className="w-[30%]"
          btnClassName="bg-primary-1 hover:bg-primary-1/90 dark:bg-primary-1 dark:hover:bg-primary-1/90"
          loading={loading}
        />
      }
      dissmissable={!loading}
      onDismiss={onModalDismiss}
    >
      <div>
        <MyInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          label='Name'
          placeholder='Enter your name'
          disabled={loading}
          error={nameError}
        />
        <MyInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label='Email'
          placeholder='Enter your email'
          disabled={loading}
          error={emailError}
        />
      </div>
    </MyDialog>
  )
}

export default EditProfile