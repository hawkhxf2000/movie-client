import axios from 'axios';

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// 其他配置项
export default axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    },
    timeout: 5000,
});
