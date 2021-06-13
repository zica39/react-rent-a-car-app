import { Modal,message } from 'antd';
import {MESSAGE_TYPE, RESERVATION_STATUS} from "../constants/config";
import Languages from "../languages/language";

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

export const insertKey = (data) => {
    return data.map((el,index) =>{
        return {...el,key:index};
    })
}

const getValidDate = function(d){ return new Date(d) }

const validateDateBetweenTwoDates = (fromDate,toDate,givenDate) => {
    return getValidDate(givenDate) <= getValidDate(toDate) && getValidDate(givenDate) >= getValidDate(fromDate);
}

export const getReservationStatus = (fromDate,toDate,givenDate) =>{
    if(validateDateBetweenTwoDates(fromDate,toDate,givenDate)){
        return RESERVATION_STATUS.PRESENT;
    }else {
        return getValidDate(givenDate)>getValidDate(toDate)?RESERVATION_STATUS.PREVIOUS:RESERVATION_STATUS.FUTURE;
    }
}

export const showMessage = (msg,type=MESSAGE_TYPE.SUCCESS) =>{
    switch(type) {
        case MESSAGE_TYPE.SUCCESS:
        setTimeout(() => message.success(msg), 0);
        break;
        case MESSAGE_TYPE.ERROR:
            setTimeout(() => message.error(msg), 0);
            break;
        case MESSAGE_TYPE.WARNING:
            setTimeout(() => message.warning(msg), 0);
            break;
        default:
    }
}

export const _ = (key,lang) => {
    if(!lang)lang = getLang();
    return Languages[lang][key];
}

export const getLang = () => {
    return loadData('lang') || 'en';
}
export const setLang = (lang) => {
    storeData('lang',lang);
}

export const concatData = (data) => {
    let arrData = [];
    if(data){
      data.pages.forEach(e=>{
          arrData[e.data?.current_page - 1] = e.data?.data;
      });
    }
    return [].concat.apply([], arrData)
}

export const concatData1 = (data) => {
    let arrData = [];
    let pages = data?.pages;
    if(pages){
        pages.forEach(e=>{
            if(e.items){
                arrData[e?.page - 1] = e.items;
            }

        });
    }
    return [].concat.apply([], arrData)
}