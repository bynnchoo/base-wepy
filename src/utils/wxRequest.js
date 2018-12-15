import wepy from 'wepy';
import util from './util';
import md5 from './md5';
import tip from './tip';

import auth from './auth';

const API_SECRET_KEY = 'www.mall.cycle.com'
const TIMESTAMP = util.getCurrentTime()
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())
const APP_TYPE = "typeb";


const wxRequest = async(params = {}, url, callback) => {
    tip.loading();
    let token = "";
    console.log("auth.............")
    console.log(auth)
    if(auth.getClientToken){
        token = auth.getClientToken();
    }
    let data = params.query || {};
    // data.sign = SIGN;
    data.time = TIMESTAMP;
    data.appType = APP_TYPE;
    let res = await wepy.request({
        url: url,
        method: params.method || 'GET',
        data: data,
        header: params.header||{ 'Content-Type': 'application/json',"Authorization": "Bearer " + token }
    });
    //TODO
    if(res.statusCode=="401"||res.statusCode=="403"){
        await auth.setClientToken()
        await wepy.request(url, data, callback);
        if(typeof callback == "function"){
            callback(res.data);
        }
    }

    tip.loaded();
    return res.data;
};




module.exports = {
    wxRequest
}
