import {Table, Space, Button, Input, DatePicker, message, Select} from 'antd';
import {PlusSquareOutlined, SearchOutlined,FilterOutlined} from '@ant-design/icons';
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import CreateModal from "./components/createModal/CreateModal";
import {useQuery, useQueryClient} from "react-query";
import {getAvailableVehicles} from "../../services/cars";
import {insertKey} from "../../functions/tools";
import {CAR_TYPES} from "../../constants/config";
import moment from "moment";

const schema = yup.object().shape({
    to_date: yup.date().required(),
    from_date: yup.date().required(),
    rent_location_id:yup.number().integer().required(),
    return_location_id:yup.number().integer().required(),
    total_price:yup.number().required(),
    vehicle_id:yup.number().integer().required(),
    client_id:yup.number().integer().required()
});
const CreateReservation = () => {

    const {formState: { errors }, handleSubmit, control, reset, setValue} = useForm({
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
                setOpenModal({open:true,title:'Kreiraj rezervaciju',id:record.id,data:record});
            }
        };
    }

    const[openModal,setOpenModal] = useState({});
    const[filter,setFilter] = useState({start_date:'',end_date:'',car_type:1});
    const columns = [
        {
            title: 'Broj tablica',
            dataIndex: 'plate_no',
        },
        {
            title: 'Goidna',
            dataIndex: 'production_year',
        },
        {
            title: 'Broj sjedista',
            dataIndex: 'no_of_seats',
        },
        {
            title: 'Cijena',
            dataIndex: 'price_per_day',
        },
    ];
   const queryClient = useQueryClient();

    const { isLoading, isError, data, error } = useQuery(['cars-available',
        {start_date:filter.start_date,end_date:filter.end_date,car_type:filter.car_type}],
        ()=>getAvailableVehicles(filter.start_date,filter.end_date,filter.car_type)
    );

    if(isError)message.error(error);

    return ( <>
        <Space style={{ marginTop: 10,display:'flex',justifyContent:'space-between' }}>
           <div>
              <span>Tip vozila: </span>
            <Select defaultValue={1} style={{width:150}} onChange={(e)=>setFilter({...filter,car_type:e})}>
                {CAR_TYPES.map((option,index) => {
                    return  <Select.Option key={index} value={option.value}>{option.label}</Select.Option>
                })}
            </Select>
           </div>
            <div><span>Period: </span>
                <DatePicker.RangePicker onChange={(e)=>{
                    if(e) {
                        let start_date = moment(e[0]._d).format('YYYY-MM-DD');
                        let end_date  = moment(e[1]._d).format('YYYY-MM-DD');
                        setFilter({...filter,start_date:start_date,end_date:end_date})

                    }else{
                        setFilter({...filter,start_date:'',end_date:''});
                    }
                }} />
                <Button style={{paddingTop:2,pointerEvents:"none"}}  icon={<FilterOutlined />} />
            </div>

            <CreateModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={openModal.title}
                form={{errors:errors,handleSubmit:handleSubmit,control:control,reset:reset,setValue:setValue}}
                queryClient={queryClient}
            />
        </Space>
        <Table onRow={onRowClick}
               columns={columns}
               dataSource={data?insertKey(data.data.data):[]}
               bordered={true}
               pagination={false}
               loading={isLoading}
               scroll={{ y: window.innerHeight-250 }}
               className='hover-row'
        />
    </>)

}

export default CreateReservation;