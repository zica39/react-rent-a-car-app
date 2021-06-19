import { Space, Button, DatePicker, Spin} from 'antd';
import { InfinityTable  as Table } from 'antd-table-infinity';
import { EditOutlined,PlusSquareOutlined,DeleteOutlined,SearchOutlined } from '@ant-design/icons';
import {useState} from "react";
import {useHistory} from 'react-router-dom';
import EditModal from "./components/editModal/EditModal";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FORM_MODE, MESSAGE_TYPE} from "../../constants/config";
import {concatData1, showConfirm, showMessage,_} from "../../functions/tools";
import {useInfiniteQuery, useMutation, useQueryClient} from "react-query";
import {deleteReservation, getReservations} from "../../services/reservations";
import {reservationScheme} from "../../constants/schemes";

const Reservations = () => {

    const {formState: { errors }, handleSubmit, control,reset,setValue,getValues} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(reservationScheme()),
        defaultValues:{
            to_date:'',
            from_date:'',
            total_price:0
        }
    });

    const onRowClick = (record) => {
        return {
            onClick: () => {
                console.log(record); //record.id
                setOpenModal({open:true,title:_('reservation_info'),mode:FORM_MODE.SHOW,id:record.id});
            }
        };
    }

    const history = useHistory();
    const[openModal,setOpenModal] = useState({});
    const[search,setSearch] = useState('');
    const columns = [
        {
            title: _('reservation_client_name'),
            dataIndex: ['client','name'],
        },
        {
            title: _('plate_no'),
            dataIndex: ['vehicle','plate_no'],
        },
        {
            title: _('from_date'),
            dataIndex: 'from_date',
        },
        {
            title: _('to_date'),
            dataIndex: 'to_date',
        },
        {
            title: _('rent_location'),
            dataIndex: ['rent_location','name'],
        },
        {
            title: _('return_location'),
            dataIndex: ['return_location','name'],
        },
        {
            title: _("reservation_total_price"),
            dataIndex: 'total_price',
        },
        {
            title: _('action'),
            key: 'action',
            render: (text, record) => (
                // record.id
                <Space size="middle">
                    <Button onClick={(e)=>{e.stopPropagation();setOpenModal({open:true,title:_('edit_reservation'),mode:FORM_MODE.EDIT,id:record.id}); }} icon={<EditOutlined />}/>
                    <Button onClick={(e)=>{
                        e.stopPropagation();
                        showConfirm(_('delete_reservation'),<DeleteOutlined />,_('question'),()=>{
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
    }= useInfiniteQuery(['reservations', search], getReservations, {
        getNextPageParam: ({ page, last_page }) => {
            if (page < last_page) {
                return page + 1;
            }
            return false
        },
    });
    if(isError) showMessage(error, MESSAGE_TYPE.ERROR);

    const handleFetch = () => {
        if(hasNextPage)fetchNextPage().then();
    };

    const deleteMutation = useMutation(deleteReservation, {
        onSuccess: () => {
            showMessage(_('reservation_delete_success'), MESSAGE_TYPE.SUCCESS);
            queryClient.invalidateQueries('reservations').then();
        },
        onError: (err) => {
            showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
        }
    })

    return ( <>
        <Space style={{ marginTop: 10,display:'flex',justifyContent:'space-between' }}>
            <Button icon={<PlusSquareOutlined />} onClick={()=>history.push('/reservations/create')} > {_('add_reservation_btn')}</Button>
            <div>
                <DatePicker.RangePicker onChange={(e)=>{
                    if(e) {
                        //console.log(e[0]._d)
                        setSearch(e[0]._d)

                    }else{
                       setSearch('')
                    }
                }} />
                <Button style={{paddingTop:2,pointerEvents:'none'}}  icon={<SearchOutlined />} />
            </div>

            <EditModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={openModal.title}
                form={{errors:errors,handleSubmit:handleSubmit,control:control,reset:reset,setValue,getValues}}
                queryClient={queryClient}
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

export default Reservations;