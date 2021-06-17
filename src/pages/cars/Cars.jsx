import {Space, Button, Input, Spin} from 'antd';
import { InfinityTable  as Table } from 'antd-table-infinity';
import { EditOutlined,PlusSquareOutlined,DeleteOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import ShowCarModal from "./components/showCarModal/ShowCarModal";
import StepFormModal from "./components/stepFormModal/StepFormModal";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FORM_MODE, CAR_MIN_YEAR, MESSAGE_TYPE} from "../../constants/config";
import {concatData1, insertKey, pullData, showConfirm, showMessage} from "../../functions/tools";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "react-query";
import {deleteVehicle, getVehicles} from "../../services/cars";
import {getClients} from "../../services/clients";

const car_plate = new RegExp(/^[A-Z]{1,3} [A-Z]{1,2}[0-9]{3,4}$/g)
const schema = yup.object().shape({
    plate_no: yup.string().matches(car_plate,'Neispravan format broja tablica'),
    production_year:yup.number().integer().required().min(CAR_MIN_YEAR).max((new Date()).getFullYear()),
    car_type_id:yup.number().integer().required(),
    no_of_seats: yup.number().integer().min(0).max(10),
    price_per_day:yup.number().min(0),
    remarks:yup.string().nullable().max(500)
});

const NEW_CAR = {open:true,title:'Kreiraj novo vozilo',mode:FORM_MODE.CREATE,id:0};
const Cars = () => {

    const {formState: { errors }, handleSubmit, control,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            plate_no:'',
            production_year:'',
            no_of_seats:'',
            price_per_day:0,
            remarks:''
        }
    });

    const onRowClick = (record) => {
        return {
            onClick: () => {
                console.log(record.id); //record.id
                setOpenModal({open:true,title:'Informacije o vozilu',mode:FORM_MODE.SHOW,id:record.id});
            }
        };
    }

    const[openModal,setOpenModal] = useState({});
    const[search,setSearch] = useState('');

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
            title: 'Tip vozila',
            dataIndex: ['car_type','name'],
        },
        {
            title: 'Broj sjedista',
            dataIndex: 'no_of_seats',
        },
        {
            title: 'Cijena',
            dataIndex: 'price_per_day',
        },
        {
            title: 'Napomena',
            dataIndex: 'remarks',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
               // record.id
                <Space size="middle">

                    <Button onClick={(e)=>{
                        e.stopPropagation();
                        setOpenModal({open:true,title:'Izmjeni vozilo',mode:FORM_MODE.EDIT,id:record.id});
                    }} icon={<EditOutlined />}/>

                    <Button onClick={(e)=>{
                        e.stopPropagation();
                        showConfirm('Obrisi automobil',<DeleteOutlined />,'Da li ste sigurni?',()=>{
                            return new Promise(function(myResolve, myReject) {
                               deleteMutation.mutate(record.id,{
                                   onSuccess:res=>myResolve(res),
                                   onError:err=>myReject(err)
                               });
                            })
                        })
                    }} icon={<DeleteOutlined />}/>
                </Space>
            ),
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
    }= useInfiniteQuery(['cars', search], getVehicles, {
        getNextPageParam: ({ page, last_page }) => {
            if (page < last_page) {
                return page + 1;
            }
            return false
        },
    });
    if(isError) showMessage(error, MESSAGE_TYPE.ERROR);
    // console.log((data))

    const handleFetch = () => {
        if(hasNextPage)fetchNextPage();
    };

    const deleteMutation = useMutation(deleteVehicle, {
        onSuccess: () => {
            queryClient.invalidateQueries('cars');
            showMessage('Vozilo uspjesno obrisnao!', MESSAGE_TYPE.SUCCESS);
        },
        onError: (err) => {
            showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
        }
    })

    useEffect(()=>{
        if(pullData('open_modal'))setOpenModal(NEW_CAR);
    },[]);

    return ( <>
        <Space style={{ marginTop: 10,display:'flex',justifyContent:'space-between' }}>
            <Button icon={<PlusSquareOutlined />} onClick={()=>{setOpenModal(NEW_CAR);}}>Dodaj vozilo</Button>
            <Input.Search placeholder="Pretrazi vozilo" allowClear onSearch={(e)=>setSearch(e)} style={{ width: 200 }} />

            <StepFormModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={openModal.title}
                form={{errors:errors,handleSubmit:handleSubmit,control:control,reset:reset}}
                queryClient={queryClient}
            />

             <ShowCarModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={openModal.title}
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

export default Cars;