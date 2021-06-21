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
    return JSON.parse(sessionStorage.getItem('auth')) || JSON.parse(localStorage.getItem('auth'));
}

export const saveAuth = (user, rememberMe) => {
    if(rememberMe) {
        localStorage.setItem('auth', JSON.stringify({
            'name': user.name,
            'token': user.token,
            'role': user.role
        }));
    }else{
        sessionStorage.setItem('auth', JSON.stringify({
            'name': user.name,
            'token': user.token,
            'role': user.role
        }))
    }
}

export const isRememberUser = () => {
    return sessionStorage.getItem('auth');
}
export const refreshToken = (token) => {
    let new_auth = auth();
    new_auth.token = token;
    let isRemember = isRememberUser();
    saveAuth(new_auth, isRemember);

}

export const removeAuth = () => {
    localStorage.removeItem('auth');
    sessionStorage.removeItem('auth');
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

export const dataToOptions = (data) => {
    return data.map(e=>Object({value:e.id,label:e.name}));
}

export const getEquipmentData = (data) => {
    let newData ={...data};
    newData.equipment = [];
    for(let i in data){
        if(i?.startsWith('_')){
            newData.equipment.push({
                equipment_id:i.substring(1),
                quantity: data[i] || 0
            })
            delete newData[i];
        }
    }
    return newData;
}

export const getEquipmentObj= (data) => {
    let newData = {};
    for(let i in data){
        if(i?.startsWith('_')){
            newData[i] = data[i];
        }
    }
    return newData;
}

export const getEquipmentPrice = (data) => {
    let price = 0;
        for(let i in data){
            if(i?.startsWith('_')){
                price += data[i]*5;
            }
        }
        return price;
    }

export const setEquipmentData = (data) => {
    let newData ={...data};
    data?.equipment?.forEach(e=>{
        newData['_'+e.id] = e?.pivot?.quantity || 0;
    })
    delete newData.equipment;

    return newData;
}

export const calcDays = (from_date,to_date,price_per_day) => {
        if(from_date && to_date){
            let days =  to_date.diff(from_date, 'days')   // =1

            if(days>0)return days*price_per_day;
            else return 0;
        }else{
            return 0;
        }
}

export async function createFile(obj){
    let response = await fetch(obj.url,{mode: 'no-cors'});
    let data = await response.blob();
    let metadata = {
        type: response.headers.get('content-type') || 'image/png',
    };
    //console.log(data)

    return  new File([data], Math.random() + '.png', metadata);
}

export function getImage(obj){
    let res = createFile(obj);
    res.then(file=>{
        obj.originFileObj = file
    });
    return obj;
}