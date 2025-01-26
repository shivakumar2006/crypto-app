import React from 'react'; 
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom'; 

import { useGetCryptosQuery } from '../services/cryptoApi';
import CryptoCurrencies from './CryptoCurrencies';
import News from './News';

const { Title } = Typography;

const Homepage = () => {

    const { data, isFetching, error } = useGetCryptosQuery(10);
    console.log("Full api response : ", data)
    const globalStats = data?.data?.stats || {};
    console.log("GlobalStats : ", globalStats);

    if (isFetching ) return 'Loading...'

    if (error) {
        return <div>Error: Unable to fetch data. {error.message}</div>
    }

    if (!globalStats || !globalStats.total) {
        return <div>Error: unable to fetch data</div>
    }

    console.log("isFetching: ", isFetching);
    console.log("error : ", error);
    console.log("data", data); 

    return (
        <>
            <Title level={2} className='heading'>
                GLobal Crypto Stats
            </Title>
            <Row>
                <Col span={12}><Statistic title='Total CryptoCurrencies' value={globalStats.total || 'N/A'} /></Col>
                <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges || 'N/A')} /></Col>
                <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap || 'N/A')} /></Col>
                <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume || 'N/A')} /></Col>
                <Col span={12}><Statistic title='Total Markets' value={millify(globalStats.totalMarkets || 'N/A')} /></Col>
            </Row>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Top 10 CryptoCurrnecies in the world</Title>
                <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
            </div>
            <CryptoCurrencies simplified/>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Latest Crypto News</Title>
                <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
            </div>
            <News simplified/>
        </>
    )
}

export default Homepage;