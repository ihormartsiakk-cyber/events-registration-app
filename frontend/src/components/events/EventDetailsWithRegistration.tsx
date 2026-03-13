"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Event } from "@/types/events";
import { EventDetails } from "./EventDetails";
import { RegistrationModal } from "@/features/registration/RegistrationModal";
import { Alert } from "@/components/ui/Alert";

type EventDetailsWithRegistrationProps = {
  event: Event;
};

export function EventDetailsWithRegistration(
  props: EventDetailsWithRegistrationProps,
) {
  const { event } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [snackbar, setSnackbar] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleBack = () => {
    router.back();
  };

  const handleRegistrationSuccess = (message: string) => {
    setIsModalOpen(false);
    setSnackbar({ type: "success", message });
  };
  const handleRegistrationError = (message: string) => {
    if (!message) {
      return;
    }
    setSnackbar({ type: "error", message });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleBack}
        className="mb-3 text-xs text-neutral-500 underline underline-offset-4 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← Back to events
      </button>
      <EventDetails event={event} onRegisterClick={handleOpen} />
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleClose}
        eventId={event.id}
        onSuccess={handleRegistrationSuccess}
        onError={handleRegistrationError}
      />
      {snackbar && (
        <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
          <Alert
            variant={snackbar.type === "success" ? "success" : "error"}
            message={snackbar.message}
            title={
              snackbar.type === "success" ? "success" : "error"
            }
          />
        </div>
      )}
    </>
  );
}

