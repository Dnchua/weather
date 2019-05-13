const router = require('koa-router')();
const userModel = require('../lib/mysql.js')

router.get('/getUserInfo',async (ctx) => {
    const id =  ctx.query.id;
    console.log(id);
    await userModel.findUserInfo(id)
        .then(result => {
            let res = result
            if (id == res[0]['student_num']) {
                ctx.body = res;
                console.log('查询到用户信息')
            }else{
                ctx.body = false;
                console.log('查无此用户!')
            }
        }).catch(err => {
            console.log(err)
            ctx.body = false
        })
});

router.get('/getTeachersInfo',async (ctx) => {
    const id =  ctx.query.id;
    console.log(id);
    await userModel.findTeacherData(id)
        .then(result => {
            let res = result
            if (id == res[0]['tid']) {
                ctx.body = res;
                console.log('查询到用户信息')
            }else{
                ctx.body = false;
                console.log('查无此用户!')
            }
        }).catch(err => {
            console.log(err)
            ctx.body = false
        })
});
module.exports = router