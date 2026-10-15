export const getUserKey = (type, email) => {
  return email? `${type}_${email}` : `${type}_guest`;
};

export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};