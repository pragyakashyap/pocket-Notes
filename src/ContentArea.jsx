import { useEffect, useState } from "react";
import "./App.css";
import { BiLock } from "react-icons/bi";
import { IoSendSharp } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md"; // Back arrow icon for mobile view

const ContentArea = ({ selectedGroup, getGroupInitial, onBack }) => {
  const [notes, setNotes] = useState([]);
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    if (selectedGroup && selectedGroup.groupName) {
      // Retrieve saved notes for this group from localStorage, or initialize as empty array
      const savedNotes = localStorage.getItem(selectedGroup.groupName);

      setNotes(savedNotes ? JSON.parse(savedNotes)?.notes : []);
    }
  }, [selectedGroup]);

  const handleClick = () => {
    let text = document.getElementById("notes").value;
    if (text.trim()) {
      const newNote = {
        text: text,
        date: new Date(), // Capture current date and time
      };
      // only add non-empty notes
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      // Save the updated notes to localStorage
      let updatedGroup = { ...selectedGroup, notes: updatedNotes };
      localStorage.setItem(
        selectedGroup.groupName,
        JSON.stringify(updatedGroup)
      );
      document.getElementById("notes").value = ""; // clear the textarea after sending
    }
  };

  return (
    <div className="ContentArea">
      {selectedGroup ? (
        <>
          <div className="notes-heading">
            <div
              className="group-dp"
              style={{
                backgroundColor: selectedGroup.groupColor,
                marginLeft: "0.5em",
              }}
            >
              {/* dp */}
              {getGroupInitial(selectedGroup.groupName)}
            </div>
            <div>
              <h2
                style={{
                  marginTop: "20px",
                  fontSize: "20px",
                  marginLeft: "0.4em",
                }}
              >
                {/* group name */}
                {selectedGroup.groupName}
              </h2>
            </div>
            <MdArrowBack
              className="back-button"
              style={{ position: "absolute", right: "2%", cursor: "pointer" }}
              onClick={onBack}
            />{" "}
            {/* Back button */}
          </div>
          <div className="notes">
            {notes.reverse().map((note, index) => (
              <div key={index} className="note">
                <p>{note.text}</p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                    textAlign: "right",
                    fontWeight: 500,
                  }}
                >
                  {/* Format date and time */}
                  {new Date(note.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  &nbsp;&nbsp; •{" "}
                  {new Date(note.date).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            ))}
          </div>

          <div className="input-notes">
            <textarea
              id="notes"
              className="input-area"
              placeholder="Write your text here..."
              onChange={() => setButtonState(true)}
            />
            <IoSendSharp
              style={{ color: buttonState ? "#001F8B" : "ABABAB" }}
              className="input-button"
              onClick={handleClick}
            />
          </div>
        </>
      ) : (
        <div className="on-startup">
          <h3 style={{ fontSize: "30px" }}>Pocket Notes</h3>
          <img src="/image-bg.png" />
          <p>Send and receive messages without keeping your phone online.</p>
          <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
          <span style={{ position: "absolute", bottom: "10px", left: "55%" }}>
            <BiLock style={{ marginRight: "5px" }} />{" "}
            {/* Adding margin between icon and text */}
            end-to-end encrypted
          </span>
        </div>
      )}
    </div>
  );
};

export default ContentArea;
