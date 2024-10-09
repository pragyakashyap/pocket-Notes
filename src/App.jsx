import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";
import FloatingActionButton from "./FloatingActionButton";
import "./App.css";

const App = () => {
  // State to manage popup visibility
  const [showPopup, setShowPopup] = useState(false);

  // State to create group name
  const [groupName, setGroupName] = useState("");

  //state to select color
  const [selectedColor, setSelectedColor] = useState(null);

  const [groups, setGroups] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState(
    groups.length > 1 ? groups[0] : null
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedGroup = localStorage.getItem("groups");
    if (savedGroup) {
      const parsedGroups = JSON.parse(savedGroup);
      setGroups(parsedGroups);
    }
  }, []);

  useEffect(() => {
    //detect mobile view (width<=768px)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    // Attach event listener to handle resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  // Function to toggle popup
  const handleFabClick = () => {
    setShowPopup(true); // Trigger popup visibility
  };

  // Function to handle back button press in ContentArea
  const handleBack = () => {
    setSelectedGroup(null); // Go back to the sidebar (set selectedGroup to null)
  };

  const handleClosePopup = () => {
    if (groupName && selectedColor) {
      handleCreateGroup(groupName, selectedColor);
      setShowPopup(false); // Close the popup
    } else {
      alert("Please enter a group name and select a color.");
      setShowPopup(false);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const handleCreateGroup = (groupName, groupColor) => {
    const newGroup = {
      groupName: groupName,
      groupColor: groupColor,
      notes: [],
    };
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);

    // Immediately set the newly created group as the selected group
    setSelectedGroup(newGroup);
    // Clear the input fields after creating the group
    setGroupName("");
    setSelectedColor(null);
    // Save the updated groups to localStorage
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  const getGroupInitial = (groupName) => {
    const words = groupName.split(" ");
    const firstLetter = words[0][0];
    const lastLetter =
      words.length > 1 ? words[words.length - 1][0] : words[0][1];
    return firstLetter.toUpperCase() + lastLetter.toUpperCase();
  };

  return (
    <div className="App">
      {/* if device is mobile */}
      {isMobile ? (
        !selectedGroup ? (
          <>
            <Sidebar
              groups={groups}
              clickGroup={handleGroupClick}
              selectedGroup={selectedGroup}
              getGroupInitial={getGroupInitial}
            />
          </>
        ) : (
          <>
            <ContentArea
              selectedGroup={selectedGroup}
              getGroupInitial={getGroupInitial}
              onBack={handleBack}
            />
          </>
        )
      ) : (
        <>
          <Sidebar
            groups={groups}
            clickGroup={handleGroupClick}
            selectedGroup={selectedGroup}
            getGroupInitial={getGroupInitial}
          />
          <ContentArea
            selectedGroup={selectedGroup}
            getGroupInitial={getGroupInitial}
            onBack={handleBack}
          />{" "}
        </>
      )}

      {isMobile && !selectedGroup && (
        <FloatingActionButton onFabClick={handleFabClick} />
      )}
      {!isMobile && <FloatingActionButton onFabClick={handleFabClick} />}

      {/*PopUp Modal*/}
      {showPopup && (
        <div className="popup-modal">
          <div className="modal-content">
            <h3 style={{ margin: "1em" }}>Create New Group</h3>
            <div className="group-creation">
              <label style={{ fontWeight: "500" }}>Group Name</label>
              <input
                className="group-name"
                type="text"
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                placeholder="Enter group name"
              />
            </div>

            <div className="color-picker">
              <label style={{ fontWeight: "500" }}>Choose colour</label>
              <div className="colors-block">
                {/* Color circles */}
                {[
                  "#B38BFA",
                  "#FF79F2",
                  "#43E6FC",
                  "#F19576",
                  "#0047FF",
                  "#6691FF",
                ].map((color) => (
                  <div
                    key={color}
                    className="color-circle"
                    style={{
                      backgroundColor: color,
                      border:
                        selectedColor === color ? "1px solid black" : "none",
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
  );
};

export default App;
