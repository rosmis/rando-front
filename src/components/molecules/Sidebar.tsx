import React from "react";
import { Button } from "../ui/button";
import styled from "styled-components";
import "./Sidebar.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Sidebar = ({ isOpen, onClose }) => {
  //todo contruire hike

  const hikeTest = [
    {
      id: 1,
      name: "Hike 1",
      description: "This is a description of hike 1",
      distance: 10,
      duration: 2,
      elevation: 100,
      difficulty: "easy",
    },
    {
      id: 2,
      name: "Hike 2",
      description: "This is a description of hike 2",
      distance: 20,
      duration: 4,
      elevation: 200,
      difficulty: "medium",
    },
    {
      id: 3,
      name: "Hike 3",
      description: "This is a description of hike 3",
      distance: 30,
      duration: 6,
      elevation: 300,
      difficulty: "hard",
    },
  ];

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <Button className="close-btn" onClick={onClose}>
          <CloseRoundedIcon />
        </Button>
      </div>
    </>
  );
};

export default Sidebar;
