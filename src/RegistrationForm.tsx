import React, { useState, ChangeEvent, FormEvent, KeyboardEvent, useRef, useEffect } from 'react';
import states, { StateOption } from './Constants/states';

export interface UserData {
  id: string;
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
  const [isupdate, setisupdate] = useState(false);
  const [isReg, setIsReg] = useState(false);
  const [view, setView] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    id: '',
    name: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    password: '',
  });
  const [users, setUsers] = useState<UserData[]>([]);
  const [formErrors, setFormErrors] = useState<Partial<UserData>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserData({
      ...userData,
      state: e.target.value,
    });
  };

  const handleView = (user: UserData) => {
    setView(true);
    setUserData(user); 
  };

  const beUserData: any = JSON.parse(localStorage?.getItem('users') ?? '{}');

  console.log('beUserData', beUserData);
  

  const validateForm = () => {
    const errors: Partial<UserData> = {};

    if (!userData.name) errors.name = 'Name is required';
    if (!userData.gender) errors.gender = 'Gender is required';
    if (!userData.email) errors.email = 'Email is required';
    if (!userData.phone) errors.phone = 'Phone number is required';
    if (!userData.address) errors.address = 'Address is required';
    if (!userData.city) errors.city = 'City is required';
    if (!userData.state) errors.state = 'State is required';
    if (!userData.password) errors.password = 'Password is required';

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = userData.id
      ? existingUsers.map((user: UserData) => (user.id === userData.id ? userData : user))
      : [...existingUsers, { ...userData, id: Date.now().toString() }];

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setUserData({
      id: '',
      name: '',
      gender: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      password: '',
    });
    setFormErrors({});
    setIsReg(false);
    setisupdate(false);
  };

  const handleDelete = (id: string) => {
    const updatedUsers = users.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    
  };

  const handleEdit = (user: UserData, e: any) => {
    e.preventDefault();
    setisupdate(true);
    setUserData(user);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (formRef.current) {
        const focusableElements = Array.from(formRef.current.querySelectorAll('input, select')) as HTMLElement[];
        const currentIndex = focusableElements.indexOf(e.target as HTMLElement);
        const nextIndex = currentIndex + 1;

        if (nextIndex < focusableElements.length) {
          (focusableElements[nextIndex] as HTMLElement)?.focus();
        } else {
          formRef.current.requestSubmit();
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex-col flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isupdate ? "Update User" : isReg ? "User Registration" : view ? "User View" : <>
            <div>
              <button onClick={()=>setIsReg(true)} className='bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800'>Create User </button>
            </div>
          </>}
          
        </h2>
        {isupdate || isReg ?
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`mt-1 p-2 w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                required
              />
              {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`mt-1 p-2 w-full border ${formErrors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formErrors.gender && <p className="text-red-500 text-xs">{formErrors.gender}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`mt-1 p-2 w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                required
              />
              {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`mt-1 p-2 w-full border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                required
              />
              {formErrors.password && <p className="text-red-500 text-xs">{formErrors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="number"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`mt-1 p-2 w-full border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                required
              />
              {formErrors.phone && <p className="text-red-500 text-xs">{formErrors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`mt-1 p-2 w-full border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                required
              />
              {formErrors.address && <p className="text-red-500 text-xs">{formErrors.address}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={userData.city}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`mt-1 p-2 w-full border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                required
              />
              {formErrors.city && <p className="text-red-500 text-xs">{formErrors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <select
                name="state"
                value={userData.state}
                onChange={handleStateChange}
                onKeyDown={handleKeyDown}
                className={`mt-1 p-2 w-full border ${formErrors.state ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                required
              >
                <option value="">Select State</option>
                {states.map((state: StateOption) => (
                  <option key={state.value} value={state.value}>{state.label}</option>
                ))}
              </select>
              {formErrors.state && <p className="text-red-500 text-xs">{formErrors.state}</p>}
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                {isupdate ? 'Update' : 'Register'}
              </button>
              <button className='bg-black text-white px-4 py-2 rounded-md' onClick={()=>{setisupdate(false); setIsReg(false)}}>Cancel</button>
              <button
                type="reset"
                onClick={() => setUserData({
                  id: '',
                  name: '',
                  gender: '',
                  email: '',
                  phone: '',
                  address: '',
                  city: '',
                  state: '',
                  password: '',
                })}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
              >
                Reset
              </button>
            </div>
          </form> : ""
        }

      </div>
      {!isReg && !isupdate && !view &&
        <div className="mt-8 flex ">
          {/* <h3 className="text-xl font-bold text-center mb-4">Registered Users</h3> */}
          <ul className="space-y-2 grid grid-cols-3 px-4 gap-8 w-full">
            {users.map(user => (
              <li key={user.id} className="flex flex-col justify-between items-start p-4 bg-gray-100 rounded-md shadow-md">
                <span>Name : {user.name} </span>
                <span>Email : {user.email}</span>
                <div className='flex mt-8 justify-between items-center gap-8'>

                  <button
                    onClick={() => handleView(user)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    View
                  </button>
                  <button
                    onClick={(e) => handleEdit(user, e)}
                    className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>

                </div>
              </li>
            ))}
          </ul>
        </div>
      }
      <>
       {view && <>
       
        <div className='w-[100vw] h-[100vh] flex justify-center items-center flex-col'>
         <h2 className='text-5xl font-bold'>Hello {userData.name}</h2> 
         <div className='flex flex-col mt-8 font-2xl font-semibold justify-start items-start '>
          <span>Your Email ID : {userData.email}</span>
          <span>Your Mobile Number : {userData.phone}</span>
         </div>
         <div className='flex gap-2 font-lg mt-8'>
          <span className=''>Address : </span>
          <span className='text-gray-700'>{userData.address}</span>
          <span className='text-gray-700'>{userData.city}</span>
          <span className='text-gray-700'>{userData.state}</span>
          <span className='text-gray-700'>{userData.address}</span>
         </div>
         <p className='mt-32 border-2 border-black px-6 py-2 hover:bg-black hover:text-white hover:scale-125 transition-all ease-in-out hover:cursor-pointer active:bg-slate-700' onClick={()=>setView(false)}>Thank you</p>
      </div>
       </>} 
      </>
    </div>
  );
};

export default RegistrationForm;
