const router = require('koa-router')();
const userModel = require('../lib/mysql.js')

router.get('/getScore',async (ctx) => {
    const ctx_query = ctx.query;
    console.log(ctx_query);
    const id = ctx_query.id;
    if(ctx_query.coursename){
        const coursename = ctx_query.coursename;
        await userModel.findScoreDataByCoursename(id,coursename)
        .then(result => {
            let res = result;
            console.log(result)
            ctx.body = {result:res,state:1};
        }).catch(err => {
            console.log(err)
            ctx.body = {msg:'未查询到该学生的成绩',state:3}
        })
        return;
    }
    if(ctx_query.all){
        await userModel.findAllScoreData()
        .then(result => {
            let res = result;
            console.log(result)
            ctx.body = {result:res,state:1};
        }).catch(err => {
            console.log(err)
            ctx.body = {msg:'未查询到该学生的成绩',state:3}
        })
        return;
    }
    await userModel.findScoreData(id)
        .then(result => {
            let res = result;
            console.log(result)
            ctx.body = {result:res,state:1};
        }).catch(err => {
            console.log(err)
            ctx.body = {msg:'未查询到该学生的成绩',state:3}
        })
});
module.exports = router