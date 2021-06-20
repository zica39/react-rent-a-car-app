import {getReservations} from "../../../services/reservations";
import {useInfiniteQuery} from "react-query";
import { Card, Modal, Button, Skeleton, Spin, Select, Space,List,Collapse} from "antd";
import React, {useState} from "react";
import {ClockCircleOutlined } from '@ant-design/icons';
import {concatData1, getReservationStatus, showMessage, _} from "../../../functions/tools";
import {FILE_URL, MESSAGE_TYPE, RESERVATION_STATUS, STATUS_COLOR} from "../../../constants/config";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import ImagePreview from "../../../components/imagePreview/ImagePreview";
import image from './no_image.png';

const Home = () => {

    const[showData,setShowData] = useState({});
    const[current,setCurrent] = useState(RESERVATION_STATUS.ALL);

    const {
        data,
        error,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        /*isFetching,*/
        isFetchingNextPage,
    }= useInfiniteQuery(['reservations', ''], getReservations, {
        getNextPageParam: ({ page, last_page }) => {
            if (page < last_page) {
                return page + 1;
            }
            return false
        },
    });
    if(isError)  showMessage(error?.response?.data?.message, MESSAGE_TYPE.ERROR);

    console.log(concatData1(data));
    useBottomScrollListener(()=>{
        if(hasNextPage)fetchNextPage().then();
    });

   const openModal = (data) => {
       setShowData(data)
   }
    const footer = [
        <Button  key="close" className="login-form-button" onClick={()=>{setShowData({})}}>
            {_('close')}
        </Button>
    ]

    return (<>
        <Space style={{ marginTop: 10,display:'flex',justifyContent:'start' }}>
            <div>
                <span>{_('show')}: </span>
                <Select defaultValue={RESERVATION_STATUS.ALL} style={{width:150}} onChange={(e)=>setCurrent(e)}>
                    <Select.Option value={RESERVATION_STATUS.ALL}>{_('all')}</Select.Option>
                    <Select.Option value={RESERVATION_STATUS.PREVIOUS}>{_('previous_reservation')}</Select.Option>
                    <Select.Option value={RESERVATION_STATUS.PRESENT}>{_('current_reservation')}</Select.Option>
                    <Select.Option value={RESERVATION_STATUS.FUTURE}>{_('future_reservation')}</Select.Option>
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
                    title={<><img
                        alt=""
                        style={{marginRight:3}}
                        height="70"
                        src={FILE_URL + val?.vehicle?.photos[0]?.photo}
                        onError={(e)=>{e.target.onerror = null; e.target.src=image}}
                    />
                        {val?.vehicle?.plate_no}
                    </>}

                    extra={<ClockCircleOutlined style={{color:STATUS_COLOR[getReservationStatus(val?.from_date,val?.to_date,Date.now())]}}/>}
                    style={{ width: '300px',margin:1 }}
                    onClick={()=>{openModal(val)}}
                >
                        <List
                            size="small"
                            style={{lineHeight:'1!important'}}
                            bordered
                            dataSource={[
                                `${_('from_date')}: ${val?.from_date}`,
                                `${_('to_date')}: ${val?.to_date}`,
                                `${_('rent_location')}: ${val?.rent_location?.name}`,
                                `${_('return_location')}: ${val?.return_location?.name}`,
                                `${_('reservation_total_price')}: ${val?.total_price}€`
                            ]}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                </Card>
            )))}
            </Skeleton>
        </div>
        {(isFetchingNextPage)&&<Spin tip={_('loading')} />}
        <Modal title={_('reservation_info')} visible={showData?.id} onCancel={()=>setShowData({})} footer={footer}>
                <div>
                    <Collapse defaultActiveKey={['1']} >
                        <Collapse.Panel header={_('reservation')} key="1">
                    <List
                        size="small"
                        /*header={<h4>{_('reservation')}</h4>}*/
                        bordered
                        dataSource={[
                            `${_('from_date')}: ${showData?.from_date}`,
                            `${_('to_date')}: ${showData?.to_date}`,
                            `${_('rent_location')}: ${showData?.rent_location?.name}`,
                            `${_('return_location')}: ${showData?.return_location?.name}`,
                            `${_('reservation_total_price')}: ${showData?.total_price}€`
                        ]}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                        </Collapse.Panel>
                        <Collapse.Panel header={_('vehicle')} key="2">
                            <List
                                size="small"
                                bordered
                                dataSource={[
                                    `${_('plate_no')}: ${showData?.vehicle?.plate_no}`,
                                    `${_('production_year')}: ${showData?.vehicle?.production_year}`,
                                    `${_('car_type')}: ${showData?.vehicle?.car_type?.name}`,
                                    `${_('no_of_seats')}: ${showData?.vehicle?.no_of_seats}`,
                                    `${_('price_per_day')}: ${showData?.vehicle?.price_per_day}€`
                                ]}
                                renderItem={item => <List.Item>{item}</List.Item>}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel header={_('photos')} key="3">
                            <ImagePreview photos={showData?.vehicle?.photos} />
                        </Collapse.Panel>
                        <Collapse.Panel header={_('equipment')} key="4">
                            <List
                                size="small"
                                bordered
                                dataSource={showData?.equipment?.length?showData?.equipment.map(e=>`${e?.name}: ${e?.pivot?.quantity}`):[]}
                                renderItem={item => <List.Item>{item}</List.Item>}
                            />
                        </Collapse.Panel>
                    </Collapse>
                </div>
        </Modal>
    </>)

}

export default Home;