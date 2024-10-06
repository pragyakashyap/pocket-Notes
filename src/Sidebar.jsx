import './App.css'
import React from 'react'


const Sidebar = ({groups,clickGroup,selectedGroup}) => {

  const getGroupInitial = (groupName) => {
    const words=groupName.split(" ");
    const firstLetter=words[0][0];
    const lastLetter=words.length > 1 ? words[words.length-1][0] : words[0][1];
    return firstLetter + lastLetter;
  }

  return (
    <div className='Sidebar'>
        <h2 style={{marginTop:'20px',fontSize:'25px'}}>Pocket Notes</h2>
        
        {groups.map((group,index) => (
          <div 
          key={index} 
          onClick={()=>{clickGroup(group)}}
          className={`group-item ${selectedGroup===group ? 'active' : ''}`}
          >
            <div className='group-dp' style={{backgroundColor: group.groupColor}}>
              {/* dp */}
              {getGroupInitial(group.groupName)}
            </div>
            <span>
              {/* group name */}
              {group.groupName}
            </span>
          </div>
        ))}
    </div>
  )
}

export default Sidebar