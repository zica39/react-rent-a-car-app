import { Table, Space, Button,Input } from 'antd';
import {DeleteOutlined, EditOutlined, UserAddOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {useEffect, useState} from "react";
import {FORM_MODE} from "../../constants/config";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ClientModal from "./components/clientModal/ClientModal";
import {pullData, showConfirm} from "../../functions/tools";
import {useQuery, useQueryClient} from "react-query";
import {getClients} from "../../services/clients";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const passportRegExp = new RegExp("^[A-Z0-9.,/ $@()]+$");
const schema = yup.object().shape({
    email: yup.string().email().required(),
    firstname:yup.string().min(3).max(255),
    lastname:yup.string().min(3).max(255),
    country:yup.string().required(),
    id_card:yup.string().min(9).max(9).matches(passportRegExp, 'Passport is not yet valid.'),
    phone:yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    date_first_reservation:yup.date().required(),
    date_last_reservation:yup.date().required(),
    remark:yup.string().max(500)
});
const NEW_CLIENT = {open:true,title:'Kreiraj novog klijenta',mode:FORM_MODE.CREATE,id:0};

const Clients = () => {


    const history = useHistory();
    const[openModal,setOpenModal] = useState({});
    const columns = [
        {
            title: 'Ime',
            dataIndex: 'name',
        },
        {
            title: 'Broj lične karte/pasoša',
            dataIndex: 'id_number',
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Datum prve rezervacije',
            dataIndex: 'date_first_reservation',
        },
        {
            title: 'Datum zadnje rezervacije',
            dataIndex: 'date_last_reservation',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                // record.id
                <Space size="middle">
                    <Button onClick={(e)=>{e.stopPropagation();setOpenModal(NEW_CLIENT); }} icon={<EditOutlined />}/>
                    <Button onClick={(e)=>{e.stopPropagation();showConfirm('Obrisi klienta',<DeleteOutlined />,'Da li ste sigurni?')}} icon={<DeleteOutlined />}/>
                </Space>
            ),
        },
    ];

    const queryClient = useQueryClient();
    const { isLoading, isError, data, error } = useQuery(['clients',{page:0,filter:0,size:0}],  getClients);

    console.log(data);
    /*const data = [];
    for (let i = 0; i < 8; i++) {
        data.push({
            key: i,
            name:'Marko Markovic',
            id_number: `84574858694`,
            phone: "069888999",
            email: `user@user.com`,
            date_first_reservation:'13/03/2019',
            date_last_reservation: '14/04/2020'
        });
    }*/

    const {formState: { errors }, handleSubmit, control,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            firstname:'',
            lastname:'',
            country: '',
            id_card:'',
            phone:'',
            email:'',
            remark:'',
            date_first_reservation:'',
            date_last_reservation:''
        }
    });
    const onRowClick = (record) => {
        return {
            onClick: () => {
                console.log(record); //record.id
                setOpenModal({open:true,title:'Informacije o klientu',mode:FORM_MODE.SHOW,id:record.id,data:record});
            }
        };
    }

    useEffect(()=>{
        if(pullData('open_modal'))setOpenModal(NEW_CLIENT);
    },[]);

   return ( <>
           <Space style={{ marginTop: 10,display:'flex',justifyContent:'space-between' }}>
               <Button icon={<UserAddOutlined />} onClick={()=>setOpenModal(NEW_CLIENT)}>Dodaj klijenta</Button>
               <Input.Search placeholder="Pretrazi klienta" allowClear onSearch={"onSearch"} style={{ width: 200 }} />
               <ClientModal
                   openModal={openModal}
                   setOpenModal={setOpenModal}
                   title={openModal.title}
                   form={{errors:errors,handleSubmit:handleSubmit,control:control,reset:reset}}
               />
           </Space>
       <Table loading={isLoading} columns={columns} dataSource={data?data.data.data:[]}  onRow={onRowClick} className='hover-row' bordered={true} pagination={false} scroll={{ y: window.innerHeight-250 }} />
       </>)

}

export default Clients;