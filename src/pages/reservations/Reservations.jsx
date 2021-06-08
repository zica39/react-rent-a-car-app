import { Table, Space, Button,DatePicker } from 'antd';
import { EditOutlined,PlusSquareOutlined,DeleteOutlined,SearchOutlined } from '@ant-design/icons';
import {useState} from "react";
import {useHistory} from 'react-router-dom';
import EditModal from "./components/editModal/EditModal";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FORM_MODE} from "../../constants/config";
import {showConfirm} from "../../functions/tools";


const schema = yup.object().shape({
    date_from: yup.date().required(),
    date_to: yup.date().required(),
    pick_up_location:yup.number().integer().required(),
    return_location:yup.number().integer().required(),
    total_price:yup.number().required()
});

const Reservations = () => {

    const {formState: { errors }, handleSubmit, control,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            date_from:'',
            date_to:'',
            /*pick_up_location:'',
            return_location:'',*/
            total_price:0
        }
    });

    const onRowClick = (record) => {
        return {
            onClick: () => {
                console.log(record); //record.id
                setOpenModal({open:true,title:'Informacije o rezervaciji',mode:FORM_MODE.SHOW,id:record.id});
            }
        };
    }

    const history = useHistory();
    const[openModal,setOpenModal] = useState({});
    const[isSearching,setIsSearching] = useState(false);
    const columns = [
        {
            title: 'Ime klijenta',
            dataIndex: 'client_name',
        },
        {
            title: 'Broj tablica',
            dataIndex: 'car_plates',
        },
        {
            title: 'Datum od',
            dataIndex: 'date_from',
        },
        {
            title: 'Datum do',
            dataIndex: 'date_to',
        },
        {
            title: 'Lokacija preuzimanja',
            dataIndex: 'pick_up_location',
        },
        {
            title: 'Lokacija vracanja',
            dataIndex: 'return_location',
        },
        {
            title: 'Ukupna cijena',
            dataIndex: 'total_price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                // record.id
                <Space size="middle">
                    <Button onClick={(e)=>{e.stopPropagation();setOpenModal({open:true,title:'Izmjeni vozilo',mode:FORM_MODE.EDIT,id:0}); }} icon={<EditOutlined />}/>
                    <Button onClick={(e)=>{e.stopPropagation();showConfirm('Obrisi rezervacijiu',<DeleteOutlined />,'Da li ste sigurni?')}} icon={<DeleteOutlined />}/>
                </Space>
            ),
        },
    ];

    const data = [];
    for (let i = 0; i < 8; i++) {
        data.push({
            key: i,
            client_name:"Marko Markovic",
            car_plates:"PG-CG310",
            date_from: "10/5/2021",
            date_to:"10/6/2021",
            pick_up_location: "Aerodrom Podgorica",
            return_location:'Aerodrom Tivat',
            total_price:33
        });
    }

    return ( <>
        <Space style={{ marginTop: 10,display:'flex',justifyContent:'space-between' }}>
            <Button icon={<PlusSquareOutlined />} onClick={()=>history.push('/reservations/create')} > Dodaj rezervaciju</Button>
            <div>
                <DatePicker.RangePicker onChange={(e)=>{
                    if(e) {
                        console.log(e[0]._d)
                        setIsSearching(true);
                    }else{
                        setIsSearching(false);
                    }
                }} />
                <Button style={{paddingTop:2,pointerEvents:"none"}}  loading={isSearching} icon={<SearchOutlined />} />
            </div>

            <EditModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={openModal.title}
                form={{errors:errors,handleSubmit:handleSubmit,control:control,reset:reset}}
            />
        </Space>
        <Table onRow={onRowClick}
               columns={columns}
               dataSource={data}
               bordered={true}
               pagination={false}
               scroll={{ y: window.innerHeight-250 }}
               className='hover-row'
        />
    </>)

}

export default Reservations;