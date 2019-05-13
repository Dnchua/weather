const router = require('koa-router')();
const userModel = require('../lib/mysql.js')
const md5 = require('md5');

router.post('/updateScore',async (ctx) => {
    const id =  ctx.request.body.id;
    const course_id = ctx.request.body.course_id;
    const newScore = ctx.request.body.newScore
    console.log(id,course_id,newScore);
    await userModel.updatetStudentScore([newScore,course_id,id])
        .then(result => {
            let res = JSON.stringify(result);
            console.log(res);
            if (res.length && res['affectedRows'] !== 0) {
                ctx.body = true;
                console.log('更新成绩成功')
            }else{
                ctx.body = false;
                console.log('更新学生成绩失败')
            }
        }).catch(err => {
            console.log(err)
            ctx.body = false
        })
});

module.exports = router