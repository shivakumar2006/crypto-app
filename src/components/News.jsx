import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const newsCount = simplified ? 6 : 62;

    // Fetching news and cryptocurrencies
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery(
        { newsCategory, count: newsCount },
        { refetchOnMountOrArgChange: true } // Ensure refetch on state change
    );
    const { data: cryptoList } = useGetCryptosQuery(100);

    if (isFetching) return <div>Loading...</div>;

    if (!cryptoNews?.data?.length) return <div>No News Available</div>;

    const handleCategoryChange = (value) => {
        console.log('Selected Category:', value); // Debug state changes
        setNewsCategory(value);
    };

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={handleCategoryChange}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {cryptoList?.data?.coins.map((coin) => (
                            <Option key={coin.id} value={coin.name}>
                                {coin.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
            )}
            {cryptoNews.data.slice(0, newsCount).map((news, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div style={{ marginBottom: '16px' }}>
                                <Avatar
                                    src={news.thumbnail || demoImage}
                                    alt={news.title}
                                    shape="square"
                                    size={200}
                                />
                            </div>
                            <Title level={5}>{news.title}</Title>
                            <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
                            <p>{news.description}</p>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;
