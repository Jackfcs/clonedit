import React from 'react'
import '../styles/Input.scss'

interface Props {
    placeHolder: string
}

const Input: React.FC<Props> = ({placeHolder}) => {
    return (
        <div className="input-container">
            <form className="form">
                <input className="input" type="text" placeholder={placeHolder}></input>
            </form>
            
        </div>
    )
}


export default Input

