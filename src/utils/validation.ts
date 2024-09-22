type returnType = {
  isValid: boolean,
  error: string
}
const validateName = (name: string): returnType => {
  const response: returnType = {
    isValid: true,
    error: ''
  };
  const regex: RegExp = /^[A-Za-z]{3,}(?: [A-Za-z]+)*$/;
  if (name.trim() == '') {
    response.isValid = false;
    response.error = 'Please enter name';
  } else if (name.length < 3) {
    response.isValid = false;
    response.error = 'Name must be at least 3 characters long';
  }
  else if (!regex.test(name)) {
    response.isValid = false;
    response.error = 'Name must be alphabets only';
  }
  return response;
}

const validateEmail = (email: string): returnType => {
  const response: returnType = {
    isValid: true,
    error: ''
  };
  const regex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (email.trim() == '') {
    response.isValid = false;
    response.error = 'Please enter email';
  } else if (!regex.test(email)) {
    response.isValid = false;
    response.error = 'Please enter valid email';
  }
  return response;
}

const validatePassword = (password: string): returnType => {
  const response: returnType = {
    isValid: true,
    error: ''
  };
  const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (password.trim() == '') {
    response.isValid = false;
    response.error = 'Please enter password';
  }else if(!regex.test(password)){
    response.isValid = false;
    response.error = 'Password must be at least 8 characters long and should contains alphabets, numbers and special characters';
  }
  return response;
}


export {
  validateName,
  validateEmail,
  validatePassword
}