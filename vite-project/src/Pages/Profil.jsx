import React from 'react'
import { useContext,useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UsersContext } from '../Context/UsersContext';
import UserProfil from '../Components/UserProfil';

export default function Profil() {

  // Access the users state variable from the UsersContext
  const { users } = useContext(UsersContext)

  // Declare a state variable to hold the selected user object
  const [item, setItem] = useState([]);

  // Get the email parameter from the URL
  let { email } = useParams();

  // Use the useEffect hook to find the user object with the matching email
  useEffect(() => {
    FindUser();
  }, []);

  // Find the user object with the matching email and update the state variable
  const FindUser = () => {
    setItem(users.find((u) => u.email == email));
  }

  // Render the UserProfil component with the selected user object as props
  return (
    <>
      <UserProfil {...item}/>
    </>
  )
}
