import {Space, Button, Input, Spin} from 'antd';
import { InfinityTable  as Table } from 'antd-table-infinity';
import {DeleteOutlined, EditOutlined, UserAddOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import {FORM_MODE, MESSAGE_TYPE} from "../../constants/config";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ClientModal from "./components/clientModal/ClientModal";
import {concatData1, pullData, showConfirm, showMessage, _} from "../../functions/tools";
import {useInfiniteQuery, useMutation, useQueryClient} from "react-query";
import {getClients,deleteClient} from "../../services/clients";
import {clientScheme} from "../../constants/schemes";

const Clients = () => {

    const NEW_CLIENT = {open:true,title:_('create_new_client'),mode:FORM_MODE.CREATE,id:0};
    const[openModal,setOpenModal] = useState({});
    const[search,setSearch] = useState('');
    const columns = [
        {
            title: _('client_name'),
            dataIndex: 'name',
        },
        {
            title:  _('identification_document_no'),
            dataIndex: 'identification_document_no',
        },
        {
            title:  _('phone_no'),
            dataIndex: 'phone_no',
        },
        {
            title:  _('client_email'),
            dataIndex: 'email',
        },
        {
            title: _('date_of_first_reservation'),
            dataIndex: 'date_of_first_reservation',
            render:(text) =>text || '-'
        },
        {
            title: _('date_of_last_reservation'),
            dataIndex: 'date_of_last_reservation',
            render:(text) =>text || '-'
        },
        /*{
            title: _('remarks'),
            dataIndex: 'remarks',
        },*/
        {
            title:  _('action'),
            key: 'action',
            render: (text, record) => (
                // record.id
                <Space size="middle">
                    <Button onClick={(e)=>{
                        e.stopPropagation();
                        setOpenModal({open:true,title:_('edit_client'),mode:FORM_MODE.EDIT,id:record?.user?.id});
                    }} icon={<EditOutlined />}/>
                    <Button onClick={(e)=>{e.stopPropagation();showConfirm(_('delete_client'),<DeleteOutlined />,_('question'),()=>{
                        return new Promise(function(myResolve, myReject) {
                            deleteMutation.mutate(record?.user?.id,{
                                onSuccess:res=>myResolve(res),
                                onError:err=>myReject(err)
                            });
                        })
                    })}} icon={<DeleteOutlined />}/>
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
        }= useInfiniteQuery(['clients', search], getClients, {
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
        if(hasNextPage)fetchNextPage().then();
    };


    const deleteMutation = useMutation(deleteClient, {
        onSuccess: () => {
            queryClient.invalidateQueries('clients').then();
            showMessage(_('client_delete_success'), MESSAGE_TYPE.SUCCESS);
        },
        onError: (error) => {
            showMessage(error?.response?.data?.message, MESSAGE_TYPE.ERROR);
        }
    })

    const {formState: { errors }, handleSubmit, control,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(clientScheme()),
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
                setOpenModal({open:true,title:_('client_info'),mode:FORM_MODE.SHOW,id:record?.user?.id});
            }
        };
    }

    useEffect(()=>{
        if(pullData('open_modal'))setOpenModal(NEW_CLIENT);
    },[]);

    return ( <>
        <Space style={{ marginTop: 10, marginBottom:5,display:'flex',justifyContent:'space-between' }}>
            <Button icon={<UserAddOutlined />} onClick={()=>setOpenModal(NEW_CLIENT)}>{_('add_client_btn')}</Button>
            <Input.Search placeholder={_('search_clients')} allowClear onSearch={(e)=>{ setSearch(e); }} style={{ width: 200 }} />
            <ClientModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={openModal.title}
                form={{errors:errors,handleSubmit:handleSubmit,control:control,reset:reset}}
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
            scroll={{ y: window.innerHeight-300 }} />
        {(isFetching && !isFetchingNextPage)&&<Spin tip="Loading..." />}
    </>)

}

export default Clients;