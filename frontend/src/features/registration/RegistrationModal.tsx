"use client";
import { Modal } from "@/components/ui/Modal";
import { RegistrationForm } from "./RegistrationForm";

type RegistrationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
};

export function RegistrationModal(props: RegistrationModalProps) {
  const { isOpen, onClose, eventId, onSuccess, onError } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Event registration">
      <RegistrationForm
        eventId={eventId}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Modal>
  );
}

