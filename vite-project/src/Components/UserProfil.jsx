import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { UsersContext } from '../Context/UsersContext'

export default function UserProfil({ picture, firstName, lastName, email, adress, number, birthday }) {

  // Get users and setUsers from the UsersContext
  const { users, setUsers } = useContext(UsersContext)

  // Create state variables for items (user data from localStorage) and change (toggle to edit form inputs)
  const [items, setItems] = useState([])
  const [change, setchange] = useState(false)

  // State variables for updated user data inputs
  const [dateNew, setDateNew] = useState()
  const [adressNew, setAdressNew] = useState()
  const [firstNameNew, setfirstNameNew] = useState()
  const [lastNameNew, setlastName] = useState()

  // Use the useNavigate hook to navigate to other pages
  const navigate = useNavigate()

  useEffect(() => {
    // Get user data from localStorage and set it to the items state variable
    let item = JSON.parse(localStorage.getItem("user"))
    setItems(item)
  }, [users])

  // Function to log out the user
  const exit = () => {
    alert('your offline')
    console.log('exit')
    navigate(`/`)
  }

  // Function to remove the user from localStorage and navigate to the register page
  const remove = () => {
    alert('you removed your user')
    localStorage.clear();
    navigate(`/register`)
    window.location.reload(false);
  }

  // Function to toggle the edit form inputs
  const update = () => {
    setchange(!change)
  }

  // Function to validate the updated user data inputs and save them to the users array in the UsersContext
  const validation = () => {
    // Get the user object from the users array
    let id = items.email;
    let user = users.find((item) => item.email == id)

    // Remove the user object from the users array
    setUsers(users.filter((item) => item != user))

    // Get the updated user data inputs or use the default values if nothing was entered
    let lastName = lastNameNew;
    let firstName = firstNameNew;
    let birthday = dateNew;
    let adress = adressNew;
    if (birthday == undefined) { birthday = user.birthday }
    if (adress == undefined) { adress = user.adress }
    if (lastName == undefined) { lastName = user.lastName }
    if (firstName == undefined) { firstName = user.firstName }

    // Get the default user data values that are not being updated
    let city = user.city;
    let email = user.email;
    let number = user.number;
    let password1 = user.password1;
    let picture = user.picture;
    let userName = user.userName;

    // Create a new user object with the updated data
    let item = {
      userName,
      password1,
      picture,
      firstName,
      lastName,
      email,
      birthday,
      city,
      adress,
      number
    }

    // Add the new user object to the users array and save it to the UsersContext
    setUsers((prev) => [...prev, item])
    alert('login to see the update')
    navigate(`/`)
  }


  return (
    <>
      {
        email != undefined ?
          <div className='box'>
            <img src={picture} width={100} alt="" />
            <h1>{firstName},{lastName}</h1>
            <div className='flex'>
              {change ? <input type="text" placeholder='First-Name' onChange={(e) => setfirstNameNew(e.target.value)} /> : ''}
              {change ? <input type="text" placeholder='Last-Name' onChange={(e) => setlastName(e.target.value)} /> : ''}
            </div>
            <p>{email}</p>
            <p>{adress},{number}</p>
            {change ? <input placeholder='new adress' type="text" onChange={(e) => setAdressNew(e.target.value)} /> : ''}
            <p>{birthday}</p>
            {change ? <input type="date" onChange={(e) => setDateNew(e.target.value)} /> : ''}
            {change ? <button><FontAwesomeIcon icon={faCheck} onClick={validation} /></button> : ''}
            <button onClick={() => update()}>Update</button>
            <button onClick={remove} className='bleu'>Remove/Delete</button>
            <button onClick={exit} className='red'>Exit/Offline</button>
          </div >
          :
          <div className='box'>
            <img src={items.picture} width={100} alt="" />
            <h1>{items.firstName},{items.lastName}</h1>
            <p>{items.email}</p>
            <p>{items.adress},{items.number}</p>
            {change ? <input placeholder='new adress' type="text" onChange={(e) => setAdressNew(e.target.value)} /> : ''}
            <p>{items.birthday}</p>
            {change ? <input type="date" onChange={(e) => setDateNew(e.target.value)} /> : ''}
            {change ? <button><FontAwesomeIcon icon={faCheck} onClick={validation} /></button> : ''}
            <button onClick={() => update()}>Update</button>
            <button onClick={remove} className='bleu'>Remove</button>
            <button onClick={exit} className='red'>Exit</button>
          </div>
      }

    </>
  )
}
