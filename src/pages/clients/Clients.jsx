import {Table, Space, Button, Input, message} from 'antd';
import {DeleteOutlined, EditOutlined, UserAddOutlined} from '@ant-design/icons';
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
    name:yup.string().min(3).max(255),
    country_id:yup.number().integer().required(),
    identification_document_no:yup.string().min(9).max(9).matches(passportRegExp, 'Passport is not yet valid.'),
    phone_no:yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    remarks:yup.string().max(500)
});
const NEW_CLIENT = {open:true,title:'Kreiraj novog klijenta',mode:FORM_MODE.CREATE,id:0};

const Clients = () => {

    const[openModal,setOpenModal] = useState({});
    const[search,setSearch] = useState('');
    const columns = [
        {
            title: 'Ime',
            dataIndex: 'name',
        },
        {
            title: 'Broj lične karte/pasoša',
            dataIndex: 'identification_document_no',
        },
        {
            title: 'Telefon',
            dataIndex: 'phone_no',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Datum prve rezervacije',
            dataIndex: 'date_of_first_reservation',
        },
        {
            title: 'Datum zadnje rezervacije',
            dataIndex: 'date_of_last_reservation',
        },
        /*{
            title: 'Napomena',
            dataIndex: 'remarks',
        },*/
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                // record.id
                <Space size="middle">
                    <Button disabled={true} onClick={(e)=>{e.stopPropagation();setOpenModal(NEW_CLIENT); }} icon={<EditOutlined />}/>
                    <Button disabled={true} onClick={(e)=>{e.stopPropagation();showConfirm('Obrisi klienta',<DeleteOutlined />,'Da li ste sigurni?')}} icon={<DeleteOutlined />}/>
                </Space>
            ),
        },
    ];

    const queryClient = useQueryClient();
    const { isLoading, isError, data, error } = useQuery(['clients',{search:search}],  ()=>getClients(search));

    if(isError)message.error(error);
   // console.log(data);

    const {formState: { errors }, handleSubmit, control,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            email: '',
            name:'',
            identification_document_no:'',
            phone_no:'',
            remarks:''
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
               <Input.Search placeholder="Pretrazi klienta" allowClear onSearch={(e)=>setSearch(e)} style={{ width: 200 }} />

               <ClientModal
                   openModal={openModal}
                   setOpenModal={setOpenModal}
                   title={openModal.title}
                   form={{errors:errors,handleSubmit:handleSubmit,control:control,reset:reset}}
                   queryClient={queryClient}
               />
           </Space>
       <Table loading={isLoading} columns={columns} dataSource={data?data.data.data:[]}  onRow={onRowClick} className='hover-row' bordered={true} pagination={false} scroll={{ y: window.innerHeight-250 }} />
       </>)

}

export default Clients;