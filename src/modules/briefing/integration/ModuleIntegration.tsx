import { Routes, Route, useNavigate } from "react-router-dom";
import { BriefingList } from "../pages/BriefingList";
import { BriefingCreate } from "../pages/BriefingCreate";
import { BriefingEdit } from "../pages/BriefingEdit";
import { ModuleConfig } from "../types";

interface ModuleIntegrationProps {
  config?: ModuleConfig;
}

export const ModuleIntegration = ({ config }: ModuleIntegrationProps) => {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate("/briefings/new");
  };

  const handleEdit = (id: string) => {
    navigate(`/briefings/edit/${id}`);
  };

  const handleView = (id: string) => {
    navigate(`/briefings/view/${id}`);
  };

  const handleSuccess = () => {
    navigate("/briefings");
  };

  const handleCancel = () => {
    navigate("/briefings");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Routes>
        <Route 
          path="/" 
          element={
            <BriefingList
              onCreateNew={handleCreateNew}
              onEdit={handleEdit}
              onView={handleView}
            />
          } 
        />
        <Route 
          path="/new" 
          element={
            <BriefingCreate
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          } 
        />
        <Route 
          path="/edit/:id" 
          element={
            <BriefingEditWrapper
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          } 
        />
        <Route 
          path="/view/:id" 
          element={
            <div className="text-center py-12">
              <h2 className="text-lg font-medium">Visualização em desenvolvimento</h2>
              <p className="text-muted-foreground">Esta funcionalidade será implementada em breve.</p>
            </div>
          } 
        />
      </Routes>
    </div>
  );
};

// Wrapper para capturar o ID da URL
const BriefingEditWrapper = ({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) => {
  const params = new URLSearchParams(window.location.search);
  const id = window.location.pathname.split('/').pop() || '';
  
  return (
    <BriefingEdit
      briefingId={id}
      onSuccess={onSuccess}
      onCancel={onCancel}
    />
  );
};