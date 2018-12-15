import {
  wxRequest
} from '@/utils/wxRequest';
import wepy from 'wepy';

let env = "-test" //-dev 或者 -test


//获取Token
const getToken = (params)=> wxRequest(params, wepy.$appConfig.baseUrl + 'oauth/token');
//const wepy.$appConfig.baseUrl = 'http://localhost:8888/obus-wechat/'

// http://localhost:8080/obus-wechat/obus/wechat/line/area/-1

// const getLineListByArea = (params)=>{
//   const areaId = params["areaId"]||"-1"
//   return wxRequest(params, wepy.$appConfig.baseUrl + 'obus/wechat/line/area/'+areaId);
// }


//获取地区列表
const getAreaList = (params) => wxRequest({
  query: {
    ...params
  }
}, wepy.$appConfig.baseUrl + 'obus/wechat/area');

const saveCustomer = (params)=> wxRequest({
  method: 'POST',
  query: {
    ...params
  }
}, wepy.$appConfig.baseUrl + 'obus/wechat/customer');

//根据区域获取线路
const getLineListByArea = (params) => wxRequest(params, wepy.$appConfig.baseUrl + 'obus/wechat/line/area/'+params["areaId"]||"-1");

//提交订单
const submitTickerOrder = (params) => wxRequest({
  method: 'POST',
  query: {
    ...params
  }
}, wepy.$appConfig.baseUrl + 'obus/wechat/ticketorder');

//根据用户id获取订单列表
const getTickerOrderList = (params)=>wxRequest({
  query: {
    ...params
  }
}, wepy.$appConfig.baseUrl + 'obus/wechat/ticketorder/user/'+params['userId']);


//分页获取订单
const getOrderListByPage = (params) => wxRequest(params, wepy.$appConfig.baseUrl + 'obus/wechat/ticketorder/user/'+params['userId']+'?currentPage='+params['page']);


const getGradeList = (params) => wxRequest(params, wepy.$appConfig.baseUrl + 'obus/wechat/grade/');


//提交包车订单
const submitBusCharteredOrder = (params) => wxRequest({
  method: 'POST',
  query: {
    ...params
  }
}, wepy.$appConfig.baseUrl + 'obus/wechat/buscharteredorder');


const laodBusCharteredOrder = (params) => wxRequest(params, wepy.$appConfig.baseUrl + 'obus/wechat/buscharteredorder/'+params['id']);

//获取代理等级和统计数据
const getProxyCount = (params) => wxRequest(params, wepy.$appConfig.baseUrl + 'obus/wechat/customer/proxy/count/'+params['userId']);


const laodTickerOrder = (params) => wxRequest(params, wepy.$appConfig.baseUrl + 'obus/wechat/ticketorder/'+params['id']);


//获取用户账户列表
const getCustomerAccount = (params) => wxRequest(params, wepy.$appConfig.baseUrl + 'obus/wechat/customer/account/'+params['userId']);
//订单付款
const goPay = (params) => wxRequest({method: 'POST'}, wepy.$appConfig.baseUrl + 'obus/wechat/customer/pay/'+params['accountId']+'/'+params['orderId']);


//提交体现
const submitWithdrawals = (params) => wxRequest({
  method: 'POST',
  query: {
    ...params
  }
}, wepy.$appConfig.baseUrl + 'obus/wechat/withdrawals'+params['userId']);

// const getDiscoverList = (params) => wxRequest(params, wepy.$appConfig.baseUrl + '/goods/list?cateidOne=1&cateidTwo=0&price=0&sales=2');

// //微信的jscode换取sessionKey
// const wxJsCode2Session = (params) => wxRequest(params, wepy.$appConfig.baseUrl + "/api/wechat/jscode2session");
// const user2session = (params) => wxRequest(params, wepy.$appConfig.baseUrl + "/api/wechat/user2session?jsoncallback=?");

// const getList = (params) => wxRequest(params, wepy.$appConfig.baseUrl + '/goods/list?cateidOne=1&cateidTwo=0&price=0&sales=2');



export default {
  getToken:getToken,
  getLineListByArea:getLineListByArea,
  getOrderListByPage:getOrderListByPage,
  submitTickerOrder:submitTickerOrder,
  getAreaList:getAreaList,
  saveCustomer:saveCustomer,
  getGradeList:getGradeList,
  submitBusCharteredOrder:submitBusCharteredOrder,
  laodBusCharteredOrder:laodBusCharteredOrder,
  getProxyCount:getProxyCount,
  laodTickerOrder:laodTickerOrder,
  getCustomerAccount:getCustomerAccount,
  goPay:goPay,
  submitWithdrawals: submitWithdrawals
}
