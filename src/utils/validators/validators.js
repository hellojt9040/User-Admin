export const EMAIL_VALIDATION = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const result = emailRegex.test(email);
  debugger;
  return result;
};
export const ROLE_VALIDATION = (role) => {
  return ['admin', 'member'].includes(role);
};
