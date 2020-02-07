export const getAuthenticatedUser = () => {
    return window.localStorage.getItem('authenticatedUser');
};

export const setAuthenticatedUser = (login) => {
    window.localStorage.setItem('authenticatedUser', login);
};

export const logout = () => {
    window.localStorage.removeItem('authenticatedUser');
};
