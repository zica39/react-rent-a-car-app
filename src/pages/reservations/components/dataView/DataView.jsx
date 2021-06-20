import {Collapse, List} from "antd";
import {_} from "../../../../functions/tools";
import ImagePreview from "../../../../components/imagePreview/ImagePreview";
import PropTypes from "prop-types";

const DataView = ({showData}) => {

    return <div>
        <Collapse defaultActiveKey={['1','2','3']} >
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
            <Collapse.Panel header={_('client')} key="2">
                <List
                    size="small"
                    bordered
                    dataSource={[
                        `${_('client_name')}: ${showData?.client?.name}`,
                        `${_('client_country')}: ${showData?.client?.country?.name}`,
                        `${_('identification_document_no')}: ${showData?.client?.identification_document_no}`,
                        `${_('client_email')}: ${showData?.client?.email}`,
                        `${_('phone_no')}: ${showData?.client?.phone_no}`,
                    ]}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            </Collapse.Panel>
            <Collapse.Panel header={_('vehicle')} key="3">
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
            <Collapse.Panel header={_('photos')} key="4">
                <ImagePreview photos={showData?.vehicle?.photos} />
            </Collapse.Panel>
            <Collapse.Panel header={_('equipment')} key="5">
                <List
                    size="small"
                    bordered
                    dataSource={showData?.equipment?.length?showData?.equipment.map(e=>`${e?.name}: ${e?.pivot?.quantity}`):[]}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            </Collapse.Panel>
        </Collapse>
    </div>
}

DataView.propTypes = {
    showData: PropTypes.object.isRequired
}

export default DataView;