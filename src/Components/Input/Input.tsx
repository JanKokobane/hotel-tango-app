import React from 'react'

type InputProps = {
    id?: string,
    type: string,
    value?: string | number,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    style?: React.CSSProperties,
    label?: string,
    error?: string,
    name?: string,
    placeholder?: string
}

export const Input: React.FC<InputProps> = ({id, type, value, onChange, style, label, error, name, placeholder }) => {
  return (
   
    <div>
        <label>{label}</label>
        <input id={id} type={type} style={style} value={value} onChange={onChange} name={name} placeholder={placeholder}/>
        {error && <span>{error}  </span>}
    </div>
  )
}