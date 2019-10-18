import axios from 'axios';

// Build a module that "creates" a new "instance" of the axios object
// - instance of axios will have baseURL. Make a function
// - headers object -> authorization header with the token
// before login send authorization and get token

//different things can pass in axios.create - look on axios github
export const axiosWithAuth = () => {
  //get token from local storage
  const token = localStorage.getItem('token');
  //.create: new instance of axios, with custom config.
  return axios.create({
    baseURL: 'http://localhost:5000/api',
    //authenication, token comes from local storage
    headers: {
      Authorization: token
    }
  });
};