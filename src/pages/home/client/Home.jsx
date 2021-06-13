import {getReservations} from "../../../services/reservations";
import {useQuery} from "react-query";
import {Pagination, Card, message, Modal, Button,Skeleton} from "antd";
import {useState} from "react";
import {ClockCircleOutlined } from '@ant-design/icons';
import {getReservationStatus} from "../../../functions/tools";
import {STATUS_COLOR} from "../../../constants/config";

const Home = () => {

    const[page,setPage] = useState(1);
    const[showData,setShowData] = useState({});
    const { isLoading, isError, data, error } = useQuery(['reservations',{search:'',page:page}], ()=>getReservations('',page));

    if(isError)message.error(error);
    console.log(data);

   const handleChange = value => {
       setPage(value);
    };
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
        <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',margin:10}}>
            <Skeleton loading={isLoading} avatar active>
            {data &&
            (data?.data?.data?.length > 0 &&
                data?.data?.data?.map((val,index) => (
                <Card
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
        <Pagination
            defaultCurrent={data?.data?.current_page}
            defaultPageSize={data?.data?.per_page} //default size of page
            onChange={handleChange}
            total={data?.data?.total} //total number of card data available
        />
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