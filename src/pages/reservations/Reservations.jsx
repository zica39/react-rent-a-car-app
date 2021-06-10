import {Table, Space, Button, DatePicker, message} from 'antd';
import { EditOutlined,PlusSquareOutlined,DeleteOutlined,SearchOutlined } from '@ant-design/icons';
import {useState} from "react";
import {useHistory} from 'react-router-dom';
import EditModal from "./components/editModal/EditModal";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FORM_MODE} from "../../constants/config";
import {insertKey, showConfirm} from "../../functions/tools";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {deleteReservation, getReservations} from "../../services/reservations";

const schema = yup.object().shape({
    to_date: yup.date().required(),
    from_date: yup.date().required(),
    rent_location_id:yup.number().integer().required(),
    return_location_id:yup.number().integer().required(),
    total_price:yup.number().required(),
    vehicle_id:yup.number().integer().required(),
    client_id:yup.number().integer().required()
});

const Reservations = () => {

    const {formState: { errors }, handleSubmit, control,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
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
                setOpenModal({open:true,title:'Informacije o rezervaciji',mode:FORM_MODE.SHOW,id:record.id});
            }
        };
    }

    const history = useHistory();
    const[openModal,setOpenModal] = useState({});
    const[isSearching,setIsSearching] = useState(false);
    const[search,setSearch] = useState('');
    const columns = [
        {
            title: 'Ime klijenta',
            dataIndex: ['client','name'],
        },
        {
            title: 'Broj tablica',
            dataIndex: ['vehicle','plate_no'],
        },
        {
            title: 'Datum od',
            dataIndex: 'from_date',
        },
        {
            title: 'Datum do',
            dataIndex: 'to_date',
        },
        {
            title: 'Lokacija preuzimanja',
            dataIndex: ['rent_location','name'],
        },
        {
            title: 'Lokacija vracanja',
            dataIndex: ['return_location','name'],
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
                    <Button onClick={(e)=>{e.stopPropagation();setOpenModal({open:true,title:'Izmjeni rezervaciju',mode:FORM_MODE.EDIT,id:record.id}); }} icon={<EditOutlined />}/>
                    <Button onClick={(e)=>{
                        e.stopPropagation();
                        showConfirm('Obrisi rezervaciju',<DeleteOutlined />,'Da li ste sigurni?',()=>{
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
    const { isLoading, isError, data, error } = useQuery(['reservations',{search:search}], ()=>getReservations(search));

    if(isError)message.error(error);

    const deleteMutation = useMutation(deleteReservation, {
        onSuccess: () => {
            message.success('Rezervacija uspjesno obrisna');
            queryClient.invalidateQueries('reservations');
        },
        onError: (error) => {
            message.error(error?.response?.statusText);
        }
    })

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
                queryClient={queryClient}
            />
        </Space>
        <Table
               onRow={onRowClick}
               loading={isLoading}
               columns={columns}
               dataSource={data?insertKey(data.data.data):[]}
               bordered={true}
               pagination={false}
               scroll={{ y: window.innerHeight-250 }}
               className='hover-row'
        />
    </>)

}

export default Reservations;