import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import SearchBar from "./components/organisms/SearchBar";
import Mapbox from "./components/organisms/Mapbox";
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import Sidebar from "./components/molecules/Sidebar";
import styled from "styled-components";

const AppContainer = styled.div`
  position: fixed;
  top: 5%;
  left: 2%;
  transform: translateX(-50%);
  z-index: 100;
`;

function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleSideBarOpen = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <>
      <AppContainer>
        <Button onClick={handleSideBarOpen}><AddLocationAltRoundedIcon /></Button>
      </AppContainer>
      <Sidebar isOpen={sideBarOpen} onClose={handleSideBarOpen} />
    </>
  );
}

export default App;
