import { useState } from "react";
import "./App.css";
import { BiLock } from "react-icons/bi";

const ContentArea = ({ selectedGroup }) => {

  const [notes,setNotes] = useState(selectedGroup.notes);

  const handleClick = () => {
    let text = document.getElementById("notes").value;
    if (text.trim()) { // only add non-empty notes
      setNotes([...notes, text]);
      document.getElementById("notes").value = ""; // clear the textarea after sending
    }
  }
  return (

    <div className="ContentArea">
      {/* <img src='/image-bg.png'/>
        <h3 style={{fontSize:'30px'}}>Pocket Notes</h3>
        <p>
        Send and receive messages without keeping your phone online.
        </p>
        <p>
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
        </p>
        <span style={{position:'absolute', bottom:'10px',left:'55%'}}>
            <BiLock style={{ marginRight: '5px'}} />  {/* Adding margin between icon and text */}
      {/* end-to-end encrypted */}
      {/* </span> */}
      <div className="notes">
        <h2>{selectedGroup.groupName}</h2>
        {notes.reverse().map((note,index) => (
          <div key={index} className="note">
            <p>{note}</p>
          </div>
        ))}
      </div>

      <div className="input-notes">
        <textarea id="notes" className="input-area" placeholder="Write your text here..."/>
        <button className="input-button" onClick={handleClick}>send</button>
      </div>
    </div>
  );
};

export default ContentArea;
