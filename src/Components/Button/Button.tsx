import React from 'react'

type ButtonProps ={
    children?:React.ReactNode
}

export const Button : React.FC<ButtonProps> = ({children}) => {
  return (
    <div>
        <button>{children}</button>
    </div>
  )
}