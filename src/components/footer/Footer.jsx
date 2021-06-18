import React from "react";
import { Layout } from 'antd';

const Footer = () => {

    return  <Layout.Footer style={{ textAlign: 'center' }}>
       Rent-a-car ©{new Date().getFullYear()} Amplitudo akademija
    </Layout.Footer>
}

export default Footer;