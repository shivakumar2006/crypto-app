import React from 'react'; 
import { Button, Menu, Typography, Avatar } from 'antd'; 
import { Link } from 'react-router-dom'; 
import { HomeOutlined, DollarOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import Icon from '../images/cryptocurrency.png';

const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar src={Icon} size='large' />
                <Typography.Title level={2} className='logo'>
                    <Link to='/'>
                    CryptoVerse
                    </Link>
                </Typography.Title>
                {/* <Button className='menu-control-container'>

                </Button> */}
            </div>
            <Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined />}>
                    <Link to='/'>Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />}>
                    <Link to='/cryptocurrencies'>CryptoCurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<DollarOutlined />}>
                    <Link to='/exchanges'>Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />}>
                    <Link to='/news'>News</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Navbar;