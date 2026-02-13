//引入第三方库
const express = require('express');
const path = require('path');
const os = require('os');

//创建服务器
const app = express();
const port = 3000;

//设置路由规则
app.use(express.static('public'));

//获取本机ip
function getIP()
{
    const interfaces = os.networkInterfaces();
    for(let name in interfaces)
    {
        for(let iface of interfaces[name])
        {
            if(iface.family === 'IPv4' && !iface.internal)
            {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

//启动服务器
app.listen(port,'0.0.0.0',() =>{
    const ip = getIP();
    console.log('服务器已经启动...');
    console.log('本机访问：http://localhost:'+port);
    console.log('局域网访问：http://'+ip+':'+port);
})