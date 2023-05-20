import axios from 'axios';

const RequestInstance = () =>
  axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  });

export default RequestInstance;
