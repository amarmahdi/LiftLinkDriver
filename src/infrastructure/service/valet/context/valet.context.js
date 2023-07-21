/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_VALETS } from '../../query'

export const ValetContext = createContext()

export const ValetProvider = ({ children }) => {
  const [defects, setDefects] = useState([])

  const addDefects = (val) => {
    if (defects.includes(val)) {
      const index = defects.indexOf(val)
      if (index > -1) {
        defects.splice(index, 1)
        setDefects([...defects])
      }
    } else {
      setDefects([...defects, val])
    }
  }

  useEffect(() => {
    console.log('defects', defects)
  }, [defects])

  return (
    <ValetContext.Provider value={{
      defects,
      addDefects
    }}>
      {children}
    </ValetContext.Provider>
  )
}
