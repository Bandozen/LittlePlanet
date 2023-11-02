import axios from 'axios';

const BASE_URL = 'https://k9c203.p.ssafy.io/api/v1/member/app/login';

export const MemberAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

