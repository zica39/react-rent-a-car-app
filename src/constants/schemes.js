import * as yup from "yup";
import {_} from "../functions/tools";
import {CAR_MIN_YEAR} from "./config";

export const loginSchema = () => yup.object().shape({
    email: yup.string().email(_('email_valid')).required(_('required_email')),
    password: yup.string()
        .required(_('required_password'))
        .min(4, _('password_min'))
        .max(12,_('password_max'))
        .matches(/^[a-zA-Z0-9!#%&]*$/g, _('password_match'))
});

export const changePasswordSchema = () => {
    let password_rules = yup.string()
        .required(_('required'))
        .min(4, _('password_min'))
        .max(12,_('password_max'))
        .matches(/^[a-zA-Z0-9!#%&]*$/g, _('password_match'));

    return yup.object().shape({
        old_password: password_rules,
        new_password:password_rules,
        confirm_password: yup.string()
            .oneOf([yup.ref('new_password'), null], _('passwords_mismatch'))

    });
}

export const clientScheme = () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const passportRegExp = new RegExp("^[A-Z0-9.,/ $@()]+$");
    return yup.object().shape({
        email: yup.string().email(_('email_valid')).required(_('required')),
        name:yup.string().min(3,_('client_name_min')).max(255,_('client_name_max')),
        country_id:yup.number().integer().required(_('required')),
        identification_document_no:yup.string().min(9, _('passport_len')).max(9,_('passport_len')).matches(passportRegExp,  _('passport')),
        phone_no:yup.string().matches(phoneRegExp, _('phone')),
        remarks:yup.string().max(500)
    });
}

export const vehicleScheme = () => {
    const car_plate = new RegExp(/^[A-Z]{1,3} [A-Z]{1,2}[0-9]{3,4}$/g)
    return  yup.object().shape({
        plate_no: yup.string().matches(car_plate,_('car_plate')),
        production_year:yup.number().integer().typeError(_('required')).required(_('required')).min(CAR_MIN_YEAR).max((new Date()).getFullYear()),
        car_type_id:yup.number().integer().required(_('required')),
        no_of_seats: yup.number().integer().typeError(_('required')).required(_('required')).min(2).max(10),
        price_per_day:yup.number().min(0).moreThan(0,_('price')),
        remarks:yup.string().nullable().max(500)
    });
}

export const reservationScheme = () => {
    return yup.object().shape({
        to_date: yup.date().typeError(_('required')).required(),
        from_date: yup.date().typeError(_('required')).required(),
        rent_location_id:yup.number().integer().typeError(_('required')).required(_('required')),
        return_location_id:yup.number().integer().typeError(_('required')).required(_('required')),
        total_price:yup.number().required().moreThan(0,_('total_price')),
        vehicle_id:yup.number().integer().required(_('required')),
        client_id:yup.number().integer().typeError(_('required')).required(_('required'))
    });
}



