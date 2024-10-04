import React from 'react'
import Sidebar from './Sidebar'
import ContentArea from './ContentArea'
import FloatingActionButton from './FloatingActionButton'
import './App.css'


const App = () => {
  return (
    <div className='App'>
      <Sidebar/>
      <ContentArea/>
      <FloatingActionButton/>
    </div>
  )
}

export default App