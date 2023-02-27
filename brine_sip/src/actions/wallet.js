import axiosInstance from '../axios';

export const getWalletBalence = async ({userID}) => {
  const res = await axiosInstance.get(`/user/get/${userID}/balance/`);
  return res;
};
