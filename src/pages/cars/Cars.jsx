import { Table, Space, Button,Input } from 'antd';
import { EditOutlined,PlusSquareOutlined,DeleteOutlined } from '@ant-design/icons';
import {useState} from "react";
import EditShowModal from "./components/editShowModal/EditShowModal";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FORM_MODE,CAR_MIN_YEAR} from "../../constants/config";
import {showConfirm} from "../../functions/tools";
import './style.css';

const car_plate = new RegExp(/^[A-Z]{1,3}-[A-Z]{1,2}[0-9]{3,4}$/g)
const schema = yup.object().shape({
    car_plates: yup.string().matches(car_plate,'Neispravan format broja tablica'),
    year:yup.number().integer().required().min(CAR_MIN_YEAR).max((new Date()).getFullYear()),
    type:yup.string().required(),
    seats_number: yup.number().integer().min(0).max(10),
    price:yup.number().min(0),
    remark:yup.string().max(500)
});

const Cars = () => {

    const {formState: { errors }, handleSubmit, control,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            car_plates:'',
            year:'',
            seats_number:'',
            price:0,
            remark:''
        }
    });

    const onRowClick = (record) => {
        return {
            onClick: () => {
                console.log(record); //record.id
                setOpenModal({open:true,title:'Informacije o vozilu',mode:FORM_MODE.SHOW,id:0});
            }
        };
    }

    const[openModal,setOpenModal] = useState({open:false,mode:0,id:0,title:''});
    const columns = [
        {
            title: 'Broj tablica',
            dataIndex: 'car_plates',
        },
        {
            title: 'Goidna',
            dataIndex: 'year',
        },
        {
            title: 'Tip vozila',
            dataIndex: 'type',
        },
        {
            title: 'Broj sjedista',
            dataIndex: 'seats_number',
        },
        {
            title: 'Cijena',
            dataIndex: 'price',
        },
        {
            title: 'Napomena',
            dataIndex: 'remark',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
               // record.id
                <Space size="middle">
                    <Button onClick={(e)=>{e.stopPropagation();setOpenModal({open:true,title:'Izmjeni vozilo',mode:FORM_MODE.EDIT,id:0}); }} icon={<EditOutlined />}/>
                    <Button onClick={(e)=>{e.stopPropagation();showConfirm('Obrisi automobil',<DeleteOutlined />,'Da li ste sigurni?')}} icon={<DeleteOutlined />}/>
                </Space>
            ),
        },
    ];

    const data = [];
    for (let i = 0; i < 8; i++) {
        data.push({
            key: i,
            car_plates:"PG-CG310",
            year: "1999",
            type: "luksuzno",
            seats_number: "5",
            price:'33',
            remark:'sve ok'
        });
    }

    return ( <>
        <Space style={{ marginTop: 10,display:'flex',justifyContent:'space-between' }}>
            <Button icon={<PlusSquareOutlined />} onClick={()=>{}}>Dodaj vozilo</Button>
            <Input.Search placeholder="Pretrazi vozilo" allowClear onSearch={"onSearch"} style={{ width: 200 }} />

            <EditShowModal
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
               className='time-table-row-select'
        />
    </>)

}

export default Cars;