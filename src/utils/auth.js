import wepy from 'wepy';
import {TOKEN_KEY,TOKEN_EXPIRE_KEY,CLIENT_ID,CLIENT_SECRET} from './constant';
import api from  '../api/api';
import 'wepy-async-function';


const setClientToken = async() => {
  var params = {
    query:{
      "grant_type": "client_credentials",
      "scope": "select",
      "client_id": CLIENT_ID,
      "client_secret": CLIENT_SECRET
    },
    method:'POST',
    header:{
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }
  const json = await api.getToken(params);
  if(json.value){
    wepy.setStorageSync(TOKEN_KEY, json.value);
    wepy.setStorageSync(TOKEN_EXPIRE_KEY, json.expiration);
  }
}


const  getClientToken = function(){
  const token = wepy.getStorageSync(TOKEN_KEY);
  return token;
}
export default class Auth {
  static getClientToken(){
    return getClientToken();
  }

  static setClientToken(appSelf){
    setClientToken(appSelf);
  }
}

const checkClientToken = async()=>{
  //判断token是否过期
  const time = wepy.getStorageSync(TOKEN_EXPIRE_KEY);
  //判断token是否存在
  const token = wepy.getStorageSync(TOKEN_KEY);

  if(!token || token == null || token == undefined || token==""){
    await setClientToken();
  }else{
    const now = new Date().getTime();
    if (!time || time < now) {
      await setClientToken();
    }
  }  
}



const saveUserInfo = async(app,userInfo, userCode,callback)=>{
  var params = {
    nickName: userInfo.nickName,
    weixinHeadImage: userInfo.avatarUrl,
    gender: userInfo.gender,
    country: userInfo.country,
    province: userInfo.province,
    city: userInfo.city,
    code: userCode
  }
  console.log("save user info")
  const json  = await api.saveCustomer(params);
  if(json.state=='success'){
    app.globalData.userInfo = userInfo;
    app.globalData.userId = json.data.userId;
    app.globalData.openId = json.data.openid;
    console.log("app.globalData.openId :"+app.globalData.openId )
    app.globalData.userType = json.data.userType;
    //setClientToken(json.data);
    if(callback){
      callback();
    }
  }
}

const setUserInfo = (app,userCode)=>{
  console.log(app)
  console.log("***********")
  wx.getUserInfo({
    withCredentials: true,
    success: res => {
      // 可以将 res 发送给后台解码出 unionId
      // this..globalData.userInfo = res.userInfo;
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      if(app.userInfoReadyCallback) {
        app.userInfoReadyCallback(res)
      }
      //保存用户信息
      saveUserInfo(app,res.userInfo, userCode);
    }
  })
}
/**
  *授权
  */
const authorize = (app)=>{
  console.log(app)
  wx.login({
    success:(loginRes)=> {
      if(loginRes.errMsg!='login:ok'){
        authorize(app)
        return false;
      }
      app.globalData.CODE = loginRes.code;
      wx.showNavigationBarLoading();
      wx.getSetting({
        success:(res)=>{
          console.log("获取用户信息")
          wx.hideNavigationBarLoading();
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            setUserInfo(app,loginRes.code);
          } else {
            wx.hideLoading();
            //跳转授权页面
            wepy.navigateTo({
              url: '/pages/auth?from=proxy&code=' + loginRes.code
            });
          }
        },
        fail:(err)=>{
          console.log(err)
        }
      })
    }
  });
}
module.exports = {
  checkClientToken:checkClientToken,
  setClientToken:setClientToken,
  saveUserInfo:saveUserInfo,
  setUserInfo:setUserInfo,
  authorize:authorize,
  getClientToken: getClientToken
}

