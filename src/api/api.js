import request from '../utils/request'
import { getCookie } from '../public/js/cookie.js'
const headers = {
    'Content-Type': 'application/json',
    'Authorization': "Basic " + getCookie('token'),
}
// const url =encodeURI(getCookie('url'));
export default {
    //login
    login(data) {
        const req = request({
            url: '/sponge/user/login',
            method: 'post',
            dataType: "json",
            data: data,
            headers: headers,
        });
        return req;
    },
    //admin submit
    submit(id) {
        const req = request({
            url: '/sponge/nodes/get?nid=' + id,
            method: 'get',
            dataType: "json",
            headers: headers,
        });
        return req;
    },
    getdata() {
        const req = request({
            url: '/sponge/nodes/list',
            method: 'get',
            dataType: "json",
            headers: headers,
        });
        return req;
    },
    add(data) {
        const req = request({
            url: '/sponge/nodes/list',
            method: 'post',
            dataType: "json",
            data: data,
            headers: headers,
        });
        return req;
    },
    select(id) {
        const req = request({
            url: '/sponge/nodes/get?nid=' + id,
            method: 'get',
            dataType: "json",
            headers: headers,
        });
        return req;
    },
    modefy(data) {
        const req = request({
            url: '/sponge/nodes/edit',
            method: 'put',
            dataType: "json",
            data: data,
            headers: headers,
        });
        return req;
    },
    //map
    nodesData() {
        const req = request({
            url: '/sponge/nodes/list',
            method: 'get',
            dataType: "json",
            headers: headers,
        });
        return req;
    },
    //senior
    sensorData(sensorId) {
        const req = request({
            url: '/sponge/sensors/list?nid=' + sensorId,
            method: 'get',
            dataType: "json",
            headers: headers,
        });
        return req;
    },
    //detect
    detectData(args) {
        const req = request({
            url: '/sponge/avg_data/sensor?' + args,
            method: 'get',
            dataType: "json",
            headers: headers,
        });
        return req;
    },
    //sensordata
    getsensorData(id) {
        const req = request({
            url: '/sponge/detail_data/sensor?sensor_id=' + id,
            method: 'get',
            dataType: "json",
            headers: headers,
        });
        return req;
    },
}