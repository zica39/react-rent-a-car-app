export const BASE_URL = 'http://akademija-api.proserver.me/api/';//'http://localhost:8000/api/';
export const FILE_URL = 'http://akademija-api.proserver.me';//'http://localhost:8000/';

export const ROLES = {
    CLIENT:'Client',
    EMPLOYEE:'Employee',
    ANY:'Any'
}
export const PAGE_INDEX = {
    "/clients": "1",
    "/cars": "2",
    "/reservations":"3"
}
export const FORM_MODE = {
    EDIT:1,
    SHOW:2,
    CREATE:3
}

export const LANGUAGE = {
    EN:'en',
    MNE:'mne'
}

export const INPUT_TYPE = {
    TEXT:1,
    SELECT:2,
    TEXTAREA:3,
    NUMBER:4,
    DATE:5,
    PASSWORD:6,
    SELECT_ASYNC:7
}

export const RESERVATION_STATUS = {
    ALL:0,
    PREVIOUS:1,
    PRESENT:2,
    FUTURE:3
}
export const STATUS_COLOR = {
    1:'RED',
    2:'GREEN',
    3:'YELLOW'
}

export const MESSAGE_TYPE = {
    SUCCESS:1,
    ERROR:2,
    WARNING:3
}
export const CAR_TYPES = [
    {
        label:'Small',
        value:1
    },
    {
        label:'Medium',
        value:2
    },
    {
        label:"Premium",
        value:3
    }
];

export const CAR_MIN_YEAR = 1990;
