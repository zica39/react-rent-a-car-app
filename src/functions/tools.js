export const auth = () => {
    return JSON.parse(localStorage.getItem('auth'));
}

export const saveAuth = (user) => {
    localStorage.setItem('auth',JSON.stringify({
        'name':user.name,
        'token': user.token,
        'role': user.role
    }));
}

export const removeAuth = () => {
    localStorage.removeItem('auth');
}