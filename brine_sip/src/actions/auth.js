import axiosInstance from '../axios';

export const signinAction = async ({data}) => {
  const {email, password} = data;
  const res = await axiosInstance.post('/sign/in/', {email, password});
  return res;
};

export const signupAction = async ({data}) => {
  const {email, password, confirm_password} = data;
  console.log(confirm_password);
  const res = await axiosInstance.post('/sign/up/', {
    email,
    password,
    confirm_password,
  });
  return res;
};

export const signoutAction = async () => {
  const res = await axiosInstance.post('/sign/out/');
  return res;
};
