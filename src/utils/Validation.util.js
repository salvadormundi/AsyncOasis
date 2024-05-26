export const validateEmail = email => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email is defined and not too long
  if (!email || email.length > 254)
    throw new Error('Email is invalid');

  // Use a single regex check for the standard email parts
  if (!emailRegex.test(email))
    throw new Error('Email is invalid');

  // Split once and perform length checks on the parts
  const parts = email.split('@');
  if (parts[0].length > 64)
    throw new Error('Email is invalid');

  // Perform length checks on domain parts
  const domainParts = parts[1].split('.');
  if (domainParts.some(part => part.length > 63))
    throw new Error('Email is invalid');
};

export const validatePhoneNumber = phoneNumber => {
  if (!phoneNumber || !phoneNumber.length === 10)
    throw new Error('Phone number is invalid');
};
