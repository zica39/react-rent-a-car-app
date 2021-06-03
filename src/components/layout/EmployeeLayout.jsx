import React from 'react';
import { Layout } from 'antd';
import NavbarTop from "../navbarTop/NavbarTop";
import SideBar from "../sideBar/SideBar";
import BreadcrumbNav from "../breadcrumbNav/BreadcrumbNav";
import Footer from "../footer/Footer";
const { Content } = Layout;

const EmployeeLayout = ({children}) => {
    return <div>
        <Layout>
            <NavbarTop/>
            <Layout>
                <SideBar/>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <BreadcrumbNav/>
                    <Content>
                        {children}
                    </Content>
                   <Footer/>
                </Layout>
            </Layout>
        </Layout>
    </div>
}

export default EmployeeLayout;
