import {Space, Button, Input, Spin} from 'antd';
import { InfinityTable  as Table } from 'antd-table-infinity';
import { EditOutlined,PlusSquareOutlined,DeleteOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import ShowCarModal from "./components/showCarModal/ShowCarModal";
import StepFormModal from "./components/stepFormModal/StepFormModal";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FORM_MODE, MESSAGE_TYPE} from "../../constants/config";
import {concatData1, pullData, showConfirm, showMessage, _} from "../../functions/tools";
import {useInfiniteQuery, useMutation, useQueryClient} from "react-query";
import {deleteVehicle, getVehicles} from "../../services/cars";
import {vehicleScheme} from "../../constants/schemes";

const Cars = () => {

    const {formState: { errors }, handleSubmit, control,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(vehicleScheme()),
        defaultValues:{
            plate_no:'',
            price_per_day:0,
            remarks:''
        }
    });

    const onRowClick = (record) => {
        return {
            onClick: () => {
                console.log(record.id); //record.id
                setOpenModal({open:true,title:_('vehicle_info'),mode:FORM_MODE.SHOW,id:record.id});
            }
        };
    }

    const[openModal,setOpenModal] = useState({});
    const[search,setSearch] = useState('');

    const columns = [
        {
            title: _("plate_no"),
            dataIndex: 'plate_no',
        },
        {
            title: _("production_year"),
            dataIndex: 'production_year',
        },
        {
            title: _("car_type"),
            dataIndex: ['car_type','name'],
        },
        {
            title: _("no_of_seats"),
            dataIndex: 'no_of_seats',
        },
        {
            title: _("price_per_day"),
            dataIndex: 'price_per_day',
        },
        {
            title: _("remarks"),
            dataIndex: 'remarks',
        },
        {
            title: _("action"),
            key: 'action',
            render: (text, record) => (
               // record.id
                <Space size="middle">

                    <Button onClick={(e)=>{
                        e.stopPropagation();
                        setOpenModal({open:true,title:_('edit_vehicle'),mode:FORM_MODE.EDIT,id:record.id});
                    }} icon={<EditOutlined />}/>

                    <Button onClick={(e)=>{
                        e.stopPropagation();
                        showConfirm(_('delete_vehicle'),<DeleteOutlined />,_('question'),()=>{
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
    if(isError) showMessage(error?.response?.data?.message, MESSAGE_TYPE.ERROR);
    // console.log((data))

    const handleFetch = () => {
        if(hasNextPage)fetchNextPage().then();
    };

    const deleteMutation = useMutation(deleteVehicle, {
        onSuccess: () => {
            queryClient.invalidateQueries('cars').then();
            showMessage(_('vehicle_delete_success'), MESSAGE_TYPE.SUCCESS);
        },
        onError: (err) => {
            showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
        }
    })

    useEffect(()=>{
        if(pullData('open_modal'))setOpenModal( {open:true,title:_('create_new_vehicle'),mode:FORM_MODE.CREATE,id:0});
    },[]);

    return ( <>
        <Space>
            <Button icon={<PlusSquareOutlined />} onClick={()=>{setOpenModal( {open:true,title:_('create_new_vehicle'),mode:FORM_MODE.CREATE,id:0});}}>{_('add_vehicle_btn')}</Button>
            <Input.Search placeholder={_('search_vehicles')} allowClear onSearch={(e)=>setSearch(e)}/>

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
            onRow={onRowClick}
            className='hover-row'
            bordered={true}
            pagination={false}
            scroll={{ y: window.innerHeight-250 }} />
        {(isFetching && !isFetchingNextPage)&&<Spin tip={_('loading')} />}
    </>)

}

export default Cars;