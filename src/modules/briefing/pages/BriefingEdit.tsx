import { useState } from "react";
import { BriefingForm } from "../components/BriefingForm";
import { useBriefings } from "../hooks/useBriefings";
import { BriefingFormData } from "../types";
import { toast } from "sonner";

interface BriefingEditProps {
  briefingId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const BriefingEdit = ({ briefingId, onSuccess, onCancel }: BriefingEditProps) => {
  const { getBriefing, updateBriefing } = useBriefings();
  const [loading, setLoading] = useState(false);
  
  const briefing = getBriefing(briefingId);

  const handleSubmit = async (data: BriefingFormData) => {
    try {
      setLoading(true);
      await updateBriefing(briefingId, data);
      toast.success("Briefing atualizado com sucesso!");
      onSuccess();
    } catch (error) {
      toast.error("Erro ao atualizar briefing. Tente novamente.");
      console.error("Erro ao atualizar briefing:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!briefing) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium">Briefing não encontrado</h2>
        <p className="text-muted-foreground">O briefing que você está tentando editar não existe.</p>
      </div>
    );
  }

  return (
    <BriefingForm
      briefing={briefing}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      loading={loading}
    />
  );
};