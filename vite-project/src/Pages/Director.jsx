import React, { useContext, useEffect, useState } from 'react'
import '../Styles/Director.css'
import { UsersContext } from '../Context/UsersContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

export default function Director() {

  const navigate = useNavigate()
  const { users, setUsers } = useContext(UsersContext);

  const [openInput, setOpenInput] = useState(false)

  // States for new user data
  const [dateNew, setDateNew] = useState();
  const [adressNew, setAdressNew] = useState();
  const [userNamenew, setfirstNameNew] = useState();

  useEffect(() => {
    setUsers(users)
  }, [])

  // Function to remove a user by email
  const remove = (id) => {
    setUsers(users.filter((item) => item.email != id))
  }

  // Function to validate and update user information
  const validation = (id) => {
    console.log(id);
    let user = users.find((item) => item.email == id) // find the object by email
    setUsers(users.filter((item) => item != user)) // update the new array without the object
    console.log(user);

    // New user data entered by user
    let userName = userNamenew;
    let birthday = dateNew;
    let adress = adressNew;

    // If no data is entered by user, keep the old data
    if (birthday == undefined) { birthday = user.birthday }
    if (adress == undefined) { adress = user.adress }
    if (userName == undefined) { userName = user.userName }

    // Default user data
    let lastName = user.lastName
    let city = user.city;
    let email = user.email;
    let number = user.number;
    let password1 = user.password1;
    let picture = user.picture;
    let firstName = user.firstName;

    // Create new user object with updated information
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
    setUsers((prev) => [...prev, item]) // Save the new object after updating
    alert('login to see the update')
    navigate(`/`)
  }

  // Function to toggle input fields for changing user information
  const changeInfo = () => {
    setOpenInput(!openInput)
  }


  return (
    <>
      <h2>director Account</h2>
      <div>
        {
          <table>
            <thead>
              <tr>
                <th></th>
                <th>picture</th>
                <th>email</th>
                <th>adress</th>
                <th>userName</th>
                <th>birthday</th>
              </tr>
            </thead>
            <tbody>
              {
                users.length != 0 ?
                  users.map((item) => <tr key={item.email}>
                    <td>
                      <button className='dd red' onClick={(e) => remove(item.email)}>delete</button>
                      <button className='dd blue' onClick={changeInfo}>onChange</button></td>
                    {openInput ? <button><FontAwesomeIcon icon={faCheck} onClick={()=>validation(item.email)} /></button> : ''}
                    <td>
                      <img src={item?.picture} />
                    </td>
                    <td> {item?.email}</td>
                    <td>{item?.adress}</td>
                    <td>{item?.userName},{item?.lastName}</td>
                    <td>{item?.birthday}</td>
                    <br />
                    <div className='input-dir-flx'>
                      {openInput ? <input placeholder='new adress' onChange={(e) => setAdressNew(e.target.value)} style={{ maxHeight: '20px', maxWidth: '500px' }} type="text" /> : ''}
                      {openInput ? <input placeholder='new name' onChange={(e) => setfirstNameNew(e.target.value)} style={{ maxHeight: '20px', maxWidth: '500px' }} type="text" /> : ''}
                      {openInput ? <input placeholder='new birthday date' onChange={(e) => setDateNew(e.target.value)} style={{ maxHeight: '20px', maxWidth: '500px' }} type="date" /> : ''}
                    </div>
                  </tr>
                  )
                  :
                  <p>Empty</p>
              }


            </tbody>
          </table>
        }
      </div>
    </>
  )
}
