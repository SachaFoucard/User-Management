import { createContext, useEffect, useState } from 'react'
import dataDirector from '../../public/data/director.json'

// Create a context to be used for managing user data
export const UsersContext = createContext()

export default function UsersContextProvider({ children }) {

  // Define state hooks for users and director data
  const [users, setUsers] = useState([]);
  const [director, setDirector] = useState([])

  // Define an array of cities to be used for user data
  const cities = ['Jerusalem',
    'Tel Aviv',
    'Haifa',
    'Rishon LeZion',
    'Petah Tikva',
    'Ashdod',
    'Beersheba',
    'Netanya',
    'Holon',
    'Bat Yam',
    'Bnei Brak',
    'Herzliya',
    'Ramat Gan',
    'Rehovot',
    'Raanana',
    'Kfar Saba',
    'Modi in Maccabim-Reut',
    'Lod',
    'Nahariya',
    'Hadera',
    'Afula',
    'Tiberias',
    'Ramla',
    'Eilat',
    'Carmiel',
    'Kiryat Ata',
    'Dimona',
    'Kfar Sava',
    'Or Akiva',
    'Yokneam Illit',
    'Givatayim',
    'Yavne',
    'Kfar Yona',
    'Arad',
    'Maale Adumim',
    'Migdal HaEmek',
    'Sderot',
    'Netivot',
    'Pardes Hanna-Karkur',
    'Akko',
    'Ofakim',
    'Elad',
    'Modiin-Maccabim-Reut',
    'Rosh HaAyin',
    'Beit Shemesh',
    'Beit Shean',
    'Karmiel',
    'Nazareth Illit',
    'Nahariya',
    'Maghar'
  ]

  // Load director data from a JSON file and set it as state on mount
  useEffect(() => {
    setDirector(dataDirector)
  }, [])

  // Define an object to hold the context value
  const value = {
    cities,
    setUsers,
    users,
    director
  }

  // Render the context provider with the value object and child components
  return (
    <>
      <UsersContext.Provider value={value}>
        {children}
      </UsersContext.Provider>
    </>
  )
}
