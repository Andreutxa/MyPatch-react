import './InputWithLabel.css'
import React from 'react'

export default function InputWithLabel({value, label, onChange, type}) {
    return (
        
        <div className="login-flex">
            <div className='login-label'>
                <label  htmlFor={label}>{label}</label>
            </div>
            <div className='login-input'>
                <input id={label} name={label} value={value} onChange={onChange} type={type} placeholder={label} />
            </div>
        </div>
    )
}