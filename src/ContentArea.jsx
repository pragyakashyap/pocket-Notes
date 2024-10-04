import React from 'react'
import './App.css'
import { BiLock } from "react-icons/bi";

const ContentArea = () => {
  return (
    <div className='ContentArea'>
        <img src='/image-bg.png'/>
        <h3 style={{fontSize:'30px'}}>Pocket Notes</h3>
        <p>
        Send and receive messages without keeping your phone online.
        </p>
        <p>
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
        </p>
        <span style={{position:'absolute', bottom:'10px',left:'55%'}}>
            <BiLock style={{ marginRight: '5px'}} />  {/* Adding margin between icon and text */}
            end-to-end encrypted
        </span>
    </div>
  )
}

export default ContentArea