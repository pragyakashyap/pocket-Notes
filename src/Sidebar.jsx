import "./App.css";
import React from "react";

const Sidebar = ({ groups, clickGroup, selectedGroup, getGroupInitial }) => {
  return (
    <>
      <div className="Sidebar">
        <div className="heading">
          <h2 style={{textAlign:"center"}}>Pocket Notes</h2>
        </div>
        <div className="items">
          {groups.length > 0
            ? groups.map((group, index) => (
                <div
                  key={index}
                  onClick={() => {
                    clickGroup(group);
                  }}
                  className={`group-item ${
                    selectedGroup === group ? "active" : ""
                  }`}
                >
                  <div
                    className="group-dp"
                    style={{ backgroundColor: group.groupColor }}
                  >
                    {/* dp */}
                    {getGroupInitial(group.groupName)}
                  </div>
                  <span>
                    {/* group name */}
                    {group.groupName}
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
