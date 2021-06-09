import { Modal } from 'antd';

export const storeData = (name,data) =>{
    localStorage.setItem(name,JSON.stringify(data));
}
export const loadData = (name) =>{
    return JSON.parse(localStorage.getItem(name));
}
export const pullData = (name) =>{
    let data = JSON.parse(localStorage.getItem(name));
    destroyData(name);
    return data;
}
export const destroyData = (name) => {
    localStorage.removeItem(name);
}

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

export const getToken = () =>{
    return 'Bearer '+auth()?.['token'];
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

export const error = (title,msg,onOk) =>  {
    Modal.error({
        title: title,
        content: msg,
        onOk:onOk
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