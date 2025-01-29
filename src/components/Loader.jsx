import React from 'react'; 
import { Flex, Spin } from 'antd'; 
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
    <Flex align='center' gap='middle'>
        <Spin indicator={<LoadingOutlined Spin />} size='small'/>
    </Flex>
}

export default Loading;