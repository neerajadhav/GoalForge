import { useState, type ChangeEvent, type FormEvent } from 'react';

export interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<void> | void;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  setFieldError: (field: keyof T, error: string) => void;
  clearErrors: () => void;
  resetForm: () => void;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof T]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear any existing errors
    setErrors({});
    
    // Run validation if provided
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
    } catch (error) {
      // Handle submission error
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const setFieldError = (field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldError,
    clearErrors,
    resetForm,
  };
};
