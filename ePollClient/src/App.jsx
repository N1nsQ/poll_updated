import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Polls from "./components/Polls";
import Poll from "./components/Poll";
import Create from "./components/Create";
import Vote from "./components/Vote";
import Options from "./components/Options";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />    
          <Route path="/add" element={<Create />} />     
          <Route path="/polls" element={<Polls />} />
          <Route path="/polls/add" element={<Create />} />
          <Route path="/polls/:id" element={<Poll />} /> 
          <Route path="/polls/:id/vote/" element={<Options />} /> 
          <Route path="/polls/:id/vote/:option" element={<Vote />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
