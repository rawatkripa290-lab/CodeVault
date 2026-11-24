import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddKnowledge from "./pages/AddKnowledge";
import KnowledgeDetails from "./pages/KnowledgeDetails";
import EditKnowledge from "./pages/EditKnowledge";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/add-knowledge" element={<AddKnowledge />} />
  <Route
  path="/knowledge/:id"
  element={<KnowledgeDetails />}
/>
<Route path="/knowledge/:id/edit" element={<EditKnowledge />} />
</Routes>

    </BrowserRouter>
  );
}

export default App;