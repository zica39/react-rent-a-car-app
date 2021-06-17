import {Space, Button, Input, DatePicker, message, Select, Spin} from 'antd';
import { InfinityTable  as Table } from 'antd-table-infinity';
import {PlusSquareOutlined, SearchOutlined,FilterOutlined} from '@ant-design/icons';
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import CreateModal from "./components/createModal/CreateModal";
import {useInfiniteQuery, useQuery, useQueryClient} from "react-query";
import {getAvailableVehicles} from "../../services/cars";
import {concatData1, insertKey, showMessage} from "../../functions/tools";
import {CAR_TYPES, MESSAGE_TYPE} from "../../constants/config";
import moment from "moment";
import {getReservations} from "../../services/reservations";

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

    const {formState: { errors }, handleSubmit, control, reset, setValue,getValues} = useForm({
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
    const[filter,setFilter] = useState({start_date:'',end_date:'',car_type:0});
    const[params,setParams] = useState({});
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
    const {
        data,
        error,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    }= useInfiniteQuery(['cars-available', params], getAvailableVehicles, {
        getNextPageParam: ({ page, last_page }) => {
            if (page < last_page) {
                return page + 1;
            }
            return false
        },
    enabled:Boolean(params.car_type)
    });
    if(isError) showMessage(error, MESSAGE_TYPE.ERROR);

    const handleFetch = () => {
        if(hasNextPage)fetchNextPage();
    };

    return ( <>
        <Space style={{ marginTop: 10,display:'flex',justifyContent:'start' }}>
           <div>
              <span>Tip vozila: </span>
            <Select placeholder="Izaberite tip vozila" style={{width:150}} onChange={(e)=>setFilter({...filter,car_type:e})}>
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
                <Button type={ JSON.stringify(filter) === JSON.stringify(params)?'':'primary'} onClick={()=>setParams({...filter})} style={{marginLeft:10}}  icon={<FilterOutlined />} >Pretrazi</Button>
            </div>

            <CreateModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={openModal.title}
                form={{errors:errors,handleSubmit:handleSubmit,control:control,reset:reset,setValue:setValue,getValues:getValues}}
                queryClient={queryClient}
                params={params}
            />
        </Space>
        <Table
            rowKey="id"
            loading={isFetchingNextPage}
            columns={columns}
            dataSource={concatData1(data)}
            onFetch={handleFetch}
            /*pageSize={10}
            total={data?.pages[0]?.data?.total}*/
            onRow={onRowClick}
            className='hover-row'
            bordered={true}
            pagination={false}
            scroll={{ y: window.innerHeight-250 }} />
        {(isFetching && !isFetchingNextPage)&&<Spin tip="Loading..." />}
    </>)

}

export default CreateReservation;