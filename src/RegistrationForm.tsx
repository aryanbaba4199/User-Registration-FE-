import React, { useState, ChangeEvent, FormEvent } from 'react';
import Select, { SingleValue } from 'react-select';
import states from './Constants/states';
import axios from 'axios';


// --------Defining state interface --------

interface StateOption {
  value: string;
  label: string;
}

// -------Defining user Interface ---------
interface UserData {
  name: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const [beUserData, setBeUserData] = useState<UserData>({
    name: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    password: '',
  })
  const [userData, setUserData] = useState<UserData>({
    name: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    password: '',
  });


  // --------Handling input changes-------------
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  //------- Handling state changes--------
  const handleStateChange = (selectedOption: SingleValue<StateOption>) => {
    if (selectedOption) {
      setUserData({
        ...userData,
        state: selectedOption.value
      });
    }
  };


  

  // --------Handling form submission-------------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form
  
    try {
      // sending request to backend with user data
      const res = await axios.post('http://localhost:5000/api/users/register', userData);
      if (res.status === 200) {
        setBeUserData(res.data);
        
        alert('Registration successful!');
        setUserData({
          name: '',
          gender: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          password: '',
        });
      }else{
        alert('Bad Response!');
      }
    } catch (error) {
      // Handling error ------
      console.error('Something Went Wrong', error);
      alert('Registration failed. Please try again.');
    }
  };
  

  return (
    <>
    {beUserData.email !=="" ? (<>
      <div className='w-[100vw] h-[100vh] flex justify-center items-center flex-col'>
         <h2 className='text-5xl font-bold'>Hello {beUserData.name}</h2> 
         <div className='flex flex-col mt-8 font-2xl font-semibold justify-start items-start '>
          <span>Your Email ID : {beUserData.email}</span>
          <span>Your Mobile Number : {beUserData.phone}</span>
         </div>
         <div className='flex gap-2 font-lg mt-8'>
          <span className=''>Address : </span>
          <span className='text-gray-700'>{beUserData.address}</span>
          <span className='text-gray-700'>{beUserData.city}</span>
          <span className='text-gray-700'>{beUserData.state}</span>
          <span className='text-gray-700'>{beUserData.address}</span>
         </div>
         <p className='mt-32 border-2 border-black px-6 py-2 hover:bg-black hover:text-white hover:scale-125 transition-all ease-in-out hover:cursor-pointer active:bg-slate-700'>Thank you</p>
      </div>
    </>) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">User Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <Select
              options={states}
              value={states.find(option => option.value === userData.state)}
              onChange={handleStateChange}
              className="mt-1"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
    </>
  );
};

export default RegistrationForm;
