import {getReservations} from "../../../services/reservations";
import {useInfiniteQuery, useQuery, useQueryClient} from "react-query";
import {Pagination, Card, message, Modal, Button, Skeleton, Spin, Select, Space} from "antd";
import React, {useState} from "react";
import {ClockCircleOutlined } from '@ant-design/icons';
import {concatData1, getReservationStatus, showMessage} from "../../../functions/tools";
import {CAR_TYPES, MESSAGE_TYPE, RESERVATION_STATUS, STATUS_COLOR} from "../../../constants/config";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const Home = () => {

    const[page,setPage] = useState(1);
    const[showData,setShowData] = useState({});
    const[current,setCurrent] = useState(RESERVATION_STATUS.ALL);

    const queryClient = useQueryClient();
    const {
        data,
        error,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    }= useInfiniteQuery(['reservations', ''], getReservations, {
        getNextPageParam: ({ page, last_page }) => {
            if (page < last_page) {
                return page + 1;
            }
            return false
        },
    });
    if(isError) showMessage(error, MESSAGE_TYPE.ERROR);

    useBottomScrollListener(()=>{
       // console.log('1');
        if(hasNextPage)fetchNextPage();
    });

   const openModal = (data) => {
       console.log(data);
       setShowData(data)
   }
    const footer = [
        <Button  key="close" className="login-form-button" onClick={()=>{setShowData({})}}>
            Zatvori
        </Button>
    ]

    return (<>
        <Space style={{ marginTop: 10,display:'flex',justifyContent:'start' }}>
            <div>
                <span>Prikazi: </span>
                <Select defaultValue={RESERVATION_STATUS.ALL} style={{width:150}} onChange={(e)=>setCurrent(e)}>
                    <Select.Option value={RESERVATION_STATUS.ALL}>Sve</Select.Option>
                    <Select.Option value={RESERVATION_STATUS.PREVIOUS}>Predhodne</Select.Option>
                    <Select.Option value={RESERVATION_STATUS.PRESENT}>Sadasnje</Select.Option>
                    <Select.Option value={RESERVATION_STATUS.FUTURE}>Buduce</Select.Option>
                </Select>
            </div>
        </Space>
        <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',margin:10}}>
            <Skeleton loading={(isLoading)} avatar active>
            {data &&
            (concatData1(data)?.length > 0 &&
                concatData1(data).map((val,index) => (
                    (getReservationStatus(val?.from_date,val?.to_date,Date.now()) === current || current === RESERVATION_STATUS.ALL) && <Card
                    loading={isLoading}
                    key={index}
                    hoverable={true}
                    title={val?.vehicle?.plate_no}

                    extra={<ClockCircleOutlined style={{color:STATUS_COLOR[getReservationStatus(val?.from_date,val?.to_date,Date.now())]}}/>}
                    style={{ width: '33%' }}
                    onClick={()=>{openModal(val)}}
                >
                    <p>Od: {val?.from_date} / {val?.rent_location?.name}</p>
                    <p>Do: {val?.to_date} /  {val?.return_location?.name}</p>
                </Card>
            )))}
            </Skeleton>
        </div>
        {(isFetchingNextPage)&&<Spin tip="Loading..." />}
        <Modal title='Informacije o rezervaciji' visible={showData?.id} onCancel={()=>setShowData({})} footer={footer}>
                <div>
                    <h3>Rezervacija:</h3>
                    <p>Od :{showData?.from_date}</p>
                    <p>Do:{showData?.to_date}</p>
                    <p>Lokacija peruzimanja:{showData?.rent_location?.name}</p>
                    <p>Lokcaija vracanja :{showData?.return_location?.name}</p>
                    <p>Ukupna cijena :{showData?.total_price}</p>
                    <h3>Klijent:</h3>
                    <p>Ime i prezime :{showData?.client?.name}</p>
                    <h3>Vozilo:</h3>
                    <p>Broj tablica :{showData?.vehicle?.plate_no}</p>
                    <p>Godina proizvodnje:{showData?.vehicle?.production_year}</p>
                    <p>Tip vozila:{showData?.vehicle?.car_type?.name}</p>
                    <p>Broj sjedista :{showData?.vehicle?.no_of_seats}</p>
                    <p>Cijena rezervacije po danu :{showData?.vehicle?.price_per_day}</p>
                    {/*<p>Dodatna oprema: ????</p>*/}
                </div>
        </Modal>
    </>)

}

export default Home;