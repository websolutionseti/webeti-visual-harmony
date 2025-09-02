import { useState } from "react";
import { BriefingForm } from "../components/BriefingForm";
import { useBriefings } from "../hooks/useBriefings";
import { BriefingFormData } from "../types";
import { toast } from "sonner";

interface BriefingCreateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const BriefingCreate = ({ onSuccess, onCancel }: BriefingCreateProps) => {
  const { createBriefing } = useBriefings();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: BriefingFormData) => {
    try {
      setLoading(true);
      await createBriefing(data);
      toast.success("Briefing criado com sucesso!");
      onSuccess();
    } catch (error) {
      toast.error("Erro ao criar briefing. Tente novamente.");
      console.error("Erro ao criar briefing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BriefingForm
      onSubmit={handleSubmit}
      onCancel={onCancel}
      loading={loading}
    />
  );
};