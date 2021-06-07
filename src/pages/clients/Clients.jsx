import { Table, Space, Button,Input } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import {useHistory} from 'react-router-dom';

const Clients = () => {

    const history = useHistory();
    const columns = [
        {
            title: 'Ime',
            dataIndex: 'name',
        },
        {
            title: 'Broj lične karte/pasoša',
            dataIndex: 'id_number',
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Datum prve rezervacije',
            dataIndex: 'date',
        },
    ];

    const data = [];
    for (let i = 0; i < 8; i++) {
        data.push({
            key: i,
            name:'Marko Markovic',
            id_number: `84574858694`,
            phone: "069888999",
            email: `user@user.com`,
            date:'13/03/2019'
        });
    }

   return ( <>
           <Space style={{ marginTop: 10,display:'flex',justifyContent:'space-between' }}>
               <Button icon={<UserAddOutlined />} onClick={()=>history.push('/clients/create')}>Dodaj klijenta</Button>
               <Input.Search placeholder="Pretrazi klienta" allowClear onSearch={"onSearch"} style={{ width: 200 }} />

           </Space>
       <Table columns={columns} dataSource={data} bordered={true} pagination={false} scroll={{ y: window.innerHeight-250 }} />
       </>)

}

export default Clients;