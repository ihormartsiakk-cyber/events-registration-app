"use client";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { RegistrationPayload } from "@/types/events";
import { registerForEvent } from "@/lib/api/events";

type RegistrationFormProps = {
  eventId: string;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
};

type FormState = RegistrationPayload;

type FormErrors = Partial<Record<keyof RegistrationPayload, string>>;

export function RegistrationForm(props: RegistrationFormProps) {
  const { eventId, onSuccess, onError } = props;

  const [values, setValues] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (payload: FormState): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!payload.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!payload.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!payload.email.includes("@")) {
      nextErrors.email = "Email must contain";
    }

    if (!payload.phone.trim()) {
      nextErrors.phone = "Phone is required";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      if (onError) {
        onError("");
      }

      await registerForEvent(eventId, values);

      const message = "You successfully registered";
      if (onSuccess) {
        onSuccess(message);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Registration failed";
      if (onError) {
        onError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <Input
        name="fullName"
        label="Full name"
        value={values.fullName}
        onChange={(event) => handleChange("fullName", event.target.value)}
        error={errors.fullName}
      />
      <Input
        name="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={(event) => handleChange("email", event.target.value)}
        error={errors.email}
      />
      <Input
        name="phone"
        label="Phone"
        value={values.phone}
        onChange={(event) => handleChange("phone", event.target.value)}
        error={errors.phone}
      />

      <div className="pt-1">
        <Button type="submit" isLoading={isSubmitting}>
          Register
        </Button>
      </div>
    </form>
  );
}

