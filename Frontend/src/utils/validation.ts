export const validators = {
  required: (value: string, fieldName: string): string | undefined => {
    return !value?.trim() ? `${fieldName} is required` : undefined;
  },

  email: (value: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? 'Please enter a valid email address' : undefined;
  },

  minLength: (value: string, min: number, fieldName: string): string | undefined => {
    return value.length < min ? `${fieldName} must be at least ${min} characters long` : undefined;
  },

  username: (value: string): string | undefined => {
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!value?.trim()) return 'Username is required';
    if (value.length < 3) return 'Username must be at least 3 characters long';
    if (value.length > 30) return 'Username must be less than 30 characters';
    if (!usernameRegex.test(value)) return 'Username can only contain letters, numbers, underscores, and hyphens';
    return undefined;
  },

  password: (value: string): string | undefined => {
    if (!value?.trim()) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters long';
    if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
    return undefined;
  },
};

export const validateLoginForm = (values: { email: string; password: string }) => {
  const errors: { email?: string; password?: string } = {};

  const emailError = validators.required(values.email, 'Email') || validators.email(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validators.required(values.password, 'Password');
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateRegisterForm = (values: { email: string; username: string; password: string }) => {
  const errors: { email?: string; username?: string; password?: string } = {};

  const emailError = validators.required(values.email, 'Email') || validators.email(values.email);
  if (emailError) errors.email = emailError;

  const usernameError = validators.username(values.username);
  if (usernameError) errors.username = usernameError;

  const passwordError = validators.password(values.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};
