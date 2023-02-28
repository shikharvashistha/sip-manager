import axiosInstance from '../axios';

export const getSips = async ({userID}) => {
  const res = await axiosInstance.get(`/user/${userID}/sip/`);
  return res;
};

export const getSipAssets = async ({userID, SIPID}) => {
  const res = await axiosInstance.get(`/user/${userID}/sip/${SIPID}/assets/`);
  return res;
};

export const addSip = async ({data, userID}) => {
  const res = await axiosInstance.post(`/user/${userID}/sip/add/`, {...data});
  return res;
};
