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

export const toTitleCase = (phrase) => {
    return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};