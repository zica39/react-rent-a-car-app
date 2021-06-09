import {Table, Space, Button, Input, DatePicker} from 'antd';
import {PlusSquareOutlined, SearchOutlined,FilterOutlined} from '@ant-design/icons';
import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import CreateModal from "./components/createModal/CreateModal";

const schema = yup.object().shape({
    date_from: yup.date().required(),
    date_to: yup.date().required(),
    client:yup.number().integer().required(),
    pick_up_location:yup.number().integer().required(),
    return_location:yup.number().integer().required(),
    total_price:yup.number().required()
});

const CreateReservation = () => {

    const {formState: { errors }, handleSubmit, control,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            date_from:'',
            date_to:'',
            total_price:0
        }
    });

    const onRowClick = (record) => {
        return {
            onClick: () => {
                console.log(record); //record.id
                setOpenModal({open:true,title:'Kreiraj rezervaciju',id:record.id});
            }
        };
    }

    const[openModal,setOpenModal] = useState({});
    const[isSearching,setIsSearching] = useState(false);
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
            title: 'Broj sjedista',
            dataIndex: 'seats_number',
        },
        {
            title: 'Cijena',
            dataIndex: 'price',
        },
    ];

    const data = [];
    for (let i = 0; i < 8; i++) {
        data.push({
            key: i,
            car_plates:"PG-CG310",
            year: "1999",
            seats_number: "5",
            price:'33'
        });
    }


    return ( <>
        <Space style={{ marginTop: 10,display:'flex',justifyContent:'space-between' }}>
            <div>Filter:
                <DatePicker.RangePicker onChange={(e)=>{
                    if(e) {
                        console.log(e[0]._d)
                        setIsSearching(true);
                    }else{
                        setIsSearching(false);
                    }
                }} />
                <Button style={{paddingTop:2,pointerEvents:"none"}}  loading={isSearching} icon={<FilterOutlined />} />
            </div>

            <CreateModal
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

export default CreateReservation;