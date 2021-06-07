import { Modal } from 'antd';


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

export const info = (title,msg) => {
    Modal.info({
        title: title,
        content: (
            <div>
                <p>{msg}</p>
            </div>
        ),
        onOk() {},
    });
}

export const success = (msg) => {
    Modal.success({
        content: msg,
    });
}

export const error = (title,msg) =>  {
    Modal.error({
        title: title,
        content: msg,
    });
}

export const warning = (title,msg) => {
    Modal.warning({
        title: title,
        content: msg,
    });
}

export const showConfirm = (title,icon,content,onOk) => {
    Modal.confirm({
        title: title,
        icon: icon,
        content: content,
        onOk,
        onCancel() {},
    });
}