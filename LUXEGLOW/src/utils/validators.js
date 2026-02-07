export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email";
  if (email.length > 255) return "Email must be less than 255 characters";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Must contain at least one uppercase letter";
  if (!/[0-9]/.test(password)) return "Must contain at least one number";
  return null;
};

export const validateName = (name) => {
  if (!name.trim()) return "Name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  if (name.trim().length > 50) return "Name must be less than 50 characters";
  return null;
};

export const validateMessage = (message) => {
  if (!message.trim()) return "Message is required";
  if (message.trim().length < 10) return "Message must be at least 10 characters";
  if (message.trim().length > 1000) return "Message must be less than 1000 characters";
  return null;
};
