import React from 'react'; 
import millify from 'millify'; 
import { Collapse, Row, Col, Typography, Avatar} from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './loader'; 

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {

    const { data, isFetching } = useGetExchangesQuery();
    const exchangesList = data?.data?.exchanges;

    return (
        <>
            <Row>
                <Col level={6}>Exchanges</Col>
                <Col level={6}>24h Trade Volume</Col>
                <Col level={6}>Markets</Col>
                <Col level={6}>Change</Col>
            </Row>
            <Row>
                {exchangesList.map((exchange) => (
                    <Col span={24}>
                        
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Exchanges;