import axiosInstance from '../axios';

export const getWalletBalence = async ({userID}) => {
  const res = await axiosInstance.get(`/user/${userID}/balance/`);
  return res;
};

// export const getWalletAssets = async ({userID}) => {
//     const res= await axiosInstance.get(`/user/${userID}
// }
