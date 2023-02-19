import { useContext, useEffect, useState } from 'react'
import { json, Link, useNavigate } from 'react-router-dom'
import { UsersContext } from '../Context/UsersContext';

export default function Register() {
  let { cities, setUsers, users } = useContext(UsersContext)

  //useNavigate 
  const navigator = useNavigate()
  // useStates
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  //passwords
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessagePass, setErrorMessagePass] = useState();
  //city
  const [city, setCity] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  //adress
  const [adress, setAdress] = useState('');
  //number Adress
  const [number, setNumber] = useState('');
  //birthday Date
  const [birthday, setBirthday] = useState('');
  //mails
  const [email, setEmail] = useState('');
  const [errorMessageMail, setErrorMessageMail] = useState();
  //pictures
  const [picture, setPiture] = useState('');
  const letters = /^[A-Za-z]+$/;
  // ready to create a new user if true
  const [ready, setReady] = useState(0);

  //function allow the user to use maximum length word
  const userNameMaxLength = (e) => {
    if (e.target.value.length < 10) { setUserName(e.target.value) }
    else { alert('cannot enter more than 60 characters') }
  }

  //function allow the user to use only letters and not number of symbol
  const firstNameLettersoNLY = (e) => {
    if (e.target.value.match(letters)) { setFirstName(e.target.value) }
    else { alert('letters only !') }
  }
  //function allow the user to use only letters and not number of symbol
  const lastNameLettersoNLY = (e) => {
    if (e.target.value.match(letters)) { setLastName(e.target.value) }
    else { alert('letters only !') }
  }

  const CityFilter = (e) => {
    setCity(e.target.value)
    setFilteredCities(cities.filter((item) => item.toLowerCase().startsWith(e.target.value.toLowerCase())));
  }
  // function allow the user to use only hebrew letters
  const AdressinHebrewOnly = (e) => {
    const hebrewRegex = /^[\u0590-\u05FF]+$/
    if (e.target.value.match(hebrewRegex)) { setAdress(e.target.value) }
    else (alert("letter only in hebrew"))
  }
  // function click to 'register' and doing some checking fields 
  const send = () => {
    //Mail
    if (!email.includes('@') || email[email.length - 1] != 'm'
      || email[email.length - 2] != 'o'
      || email[email.length - 3] != 'c') { alert('invalid mail'); setErrorMessageMail(false); setReady(ready - 1); }
    else { setErrorMessageMail(true); }
    //Password
    if (password1 != password2 || (!/[A-Z]/.test(password1)) // not same passwords || not contain a Uppercase 
      || (!/\d/.test(password1)) // not countain a numbers
      || !/[!@#$%^&*(),.?":{}|<>]/.test(password1)
      || password1.length < 7 || password1.length > 12) { // not contain a symbol
      alert('check that your password contains an Uppercase,a symbol(@#$%^&*),letters and a number and between 7-12 letters');
      setErrorMessagePass(false);
    }
    else { setErrorMessagePass(true) }

    if (errorMessageMail && errorMessagePass && userName != undefined && lastName != undefined && firstName != undefined
      && city != undefined && adress != undefined && number != '' && birthday != '' && picture != '') {
      checkIfMailExist()
    }
  }
  // function check if the user mail is already exist 
  const checkIfMailExist = () => {
    if (users.find((item) => item.email == email)) { alert('you have already an account') } // check if the user already exist 
    else { newUser() }
  }
  //function to add object to localStorage Array
  let a = [];
  function SaveDataToLocalStorage(data) {
    let receiveddata = JSON.stringify(data);
    a.push(receiveddata);
    alert(a);

    localStorage.setItem('user', a);
  }

  const newUser = () => { // create new object
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

    setUsers((prev) => [...prev, item]) // add the object to the Users michtane
    SaveDataToLocalStorage(item) // Call the function add object to local storage
    alert("Account saved !")
    console.log(users) // print the array of objects (all Users)
    console.log(localStorage)
    navigator('/') // go to Login Page 
  }

  return (
    <>
      <div className="modernForm">
        <div className="contactForm">
          <h1>Registaration Form</h1>
          <div className="name">
            <label htmlFor="fullName"> User Name:</label>
            <input type="text"
              value={userName}
              name="fullName" id="User"
              placeholder="ex: LindseyWilson15" required onChange={userNameMaxLength} />
          </div>
          <div className="name">
            <label htmlFor="fullName">First Name:</label>
            <input type="text"
              value={firstName} name="fullName" id="First"
              placeholder="ex: Lindsey (letters only)" required onChange={firstNameLettersoNLY} />
          </div>
          <div className="name">
            <label htmlFor="fullName">Last Name:</label>
            <input type="text"
              value={lastName} name="fullName" id="Last"
              placeholder="ex: Wilson  (letters only)" required onChange={lastNameLettersoNLY} />
          </div>
          <div className="name">
            <label htmlFor="Password">Password:</label>
            <input type="password"
              style={errorMessagePass != true ? { border: '1px red solid' } : {}}
              name="password" id="password1" required
              onChange={(e) => setPassword1(e.target.value)} />
          </div>
          <div className="name">
            <label htmlFor="Password">Confirm Password:</label>
            <input type="password" style={errorMessagePass != true ? { border: '1px red solid' } : {}}
              name="password" id="password2" required
              onChange={(e) => setPassword2(e.target.value)} />
          </div>
          <div className="name">
            <label htmlFor="picture">Your Email:</label>
            <input type="email"
              style={errorMessageMail !== true ? { border: '1px solid red' } : {}}
              value={email} placeholder='ex: LindseyWilson@gmail.com'
              name="picture" id="picture" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="name">
            <label htmlFor="date">Your birthday Date :</label>
            <input type="date"
              value={birthday} name="date" id="date" required
              onChange={(e) => setBirthday(e.target.value)} />
          </div>
          <div className="name">
            <label htmlFor="email">Your City:</label>
            <input type="text" placeholder='Petah Tikva'
              value={city} name="city" id="email" required onChange={CityFilter} />
            <ul>
              {
                city.length != 0 ?
                  filteredCities.map((city) => (
                    <li key={city}>{city}</li>
                  )) : ''
              }
            </ul>
            <div className="iconName"><i className="fa-solid fa-envelope"></i></div>

          </div>
          <div className="name">
            <label htmlFor="adress">Your Adress:</label>
            <input type="text"
              placeholder='כצנלסון (only hebrew)'
              value={adress} name="adress" id="adress" required onChange={AdressinHebrewOnly} />
          </div>
          <div className="name">
            <label htmlFor="number">Your Number Adress:</label>
            <input type="number"
              name="number" min={1} id="number"
              required onChange={(e) => setNumber(e.target.value)} />
          </div>
          <div className="name">
            <label htmlFor="number">A profil picture:</label>
            <input type="url"
              name="url" id="url" placeholder='https://djenje.dizodzi?jsnz' required
              onChange={(e) => setPiture(e.target.value)} />
          </div>
          <div className='btns'>
            <input type="submit"
              style={!ready ? { backgroundColor: 'red' } : {}} value="Register" onClick={send} />
            <Link to="/" className="forgot">login</Link>
          </div>
        </div>
        <div>
        </div>
      </div>

    </>
  )
}
