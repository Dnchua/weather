const router = require('koa-router')();
const userModel = require('../lib/mysql.js')
const md5 = require('md5');

router.post('/insertScore',async (ctx) => {
    const id =  ctx.request.body.id;
    const course_id = ctx.request.body.course_id;
    const newScore = ctx.request.body.newScore
    console.log(id,course_id,newScore);
    await userModel.insertStudentScore([course_id,id,newScore])
        .then(result => {
            let res = JSON.stringify(result);
            console.log(res);
            if (res.length && res['affectedRows'] !== 0) {
                ctx.body = true;
                console.log('录入成绩成功')
            }else{
                ctx.body = false;
                console.log('录入学生成绩失败')
            }
        }).catch(err => {
            console.log(err)
            ctx.body = false
        })
});

module.exports = router