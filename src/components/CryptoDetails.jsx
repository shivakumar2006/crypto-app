import React, { useState } from 'react'; 
import HTMLReactParser from 'html-react-parser/lib/index';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Spin } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loader from './Loader';

import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams(); 
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId); 
    const { data: coinHistory, isFetching: isFetchingHistory } = useGetCryptoHistoryQuery({coinId, timePeriod})
    const cryptoDetails = data?.data?.coin;

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    console.log("CoinHistory : ", coinHistory);
    console.log("COin History query params : ", {coinId, timePeriod});
    console.log('Coin ID:', coinId);
    console.log('Time Period:', timePeriod);

    if (isFetchingHistory) {
        return <Loader />
    }

    if (isFetching) {
        return (
            <Col className="coin-detail-container">
                <Spin size="large" />
            </Col>
        );
    }

    if (!cryptoDetails) {
        return (
            <Col className="coin-detail-container">
                <p>No data available for this cryptocurrency.</p>
            </Col>
        );
    }

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] ? millify(cryptoDetails?.['24hVolume']): 'N/A'}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
       <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title level={2} className='coin-name'>
                    {cryptoDetails.name} ({cryptoDetails.slug}) price
                </Title>
                <p>
                    {cryptoDetails.name} Live Price in US Dollar.
                    View value statistics, market value supply.
                </p>
            </Col>
            <Select 
                defaultValue='7d' 
                className='select-timeperiod' 
                placeholder='Select time period'
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map((date) => (
                    <Option key={date} value={date}>{date}</Option>
                ))}
            </Select>

            <LineChart
                coinHistory={coinHistory?.data?.history || []}
                currentPrice={millify(cryptoDetails.price)}
                coinName={cryptoDetails.name}
                change={cryptoDetails.change}
            />


            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            {cryptoDetails.name} Value Statistics
                        </Title>
                        <p>
                            An overview showing the stats of {cryptoDetails.name}
                        </p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>
                                {value}
                            </Text>
                        </Col>
                    ))}
                </Col>
                <Col className='other-stats-info'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            Other Statistics
                        </Title>
                        <p>
                            An overview showing the stats of Cryptocurrencies
                        </p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>
                                {value}
                            </Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'>
                        What is {cryptoDetails.name} ? 
                        <br />
                        {HTMLReactParser(cryptoDetails.description)}
                    </Title>
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coins-details-heading'>
                        {cryptoDetails.name} Links
                    </Title>
                    {cryptoDetails.links.map((link) => (
                        <Row className='coin-link' key={link.name}> 
                            <Title level={5} className='link-name'>
                                {link.type}
                            </Title>
                            <a href={link.url} target='blank' rel='noreffer'>
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
       </Col>
    );
};

export default CryptoDetails;
