import { useState } from 'react'
import Sidebar from './Sidebar'
import ContentArea from './ContentArea'
import FloatingActionButton from './FloatingActionButton'
import './App.css'
import notes from './notes'

const App = () => {
  
  // State to manage popup visibility
  const [showPopup,setShowPopup] = useState(false);

  // State to create group name
  const [groupName,setGroupName] = useState("");

  //state to select color
  const [selectedColor,setSelectedColor] = useState(null);  

  const [groups,setGroups] =useState([notes]);
  const [selectedGroup,setSelectedGroup]=useState(notes[0]);

  // Function to toggle popup
  const handleFabClick = () => {
    setShowPopup(true);  // Trigger popup visibility
  }

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  }

  const handleColorSelect = (color) => {
    setSelectedColor(color)
  }

  const handleClick = (group) => {
    setSelectedGroup(group);
  }

  return (
    <div className='App'>
      <Sidebar 
      groups={groups} 
      clickGroup={handleClick} 
      selectedGroup={selectedGroup}
      />
      <ContentArea
      selectedGroup={selectedGroup}
      />
      <FloatingActionButton onFabClick={handleFabClick}/>
      {/*PopUp Modal*/ }
      {showPopup && (
      <div className='popup-modal'>
        <div className="modal-content">
          <h2>Create New Group</h2>
          <div className="group-creation">
          <label>Group Name</label>
          <input
          className='group-name'
          type='text'
          value={groupName}
          onChange={(e)=>{
            setGroupName(e.target.value)
          }}
          placeholder='Enter group name'
          />
          </div>
          
          <div className="color-picker">
          <label>Choose colour</label>
            <div className='colors-block'>
              {/* Color circles */}
            {['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF' ,'#6691FF'].map((color) => (
                <div
                  key={color}
                  className="color-circle"
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color ? '1px solid black' : 'none',
                  }}
                  onClick={() => handleColorSelect(color)}
                ></div>
              ))}
            </div>
          </div>

          <button className="create-button" onClick={handleClosePopup}>
              Create
            </button>
        </div>
      </div>
      )}
    </div>

    

  )
}

export default App