const router = require('koa-router')();
const userModel = require('../lib/mysql.js')
const md5 = require('md5');
const moment = require('moment');
router.post('/signin',async (ctx) => {
    const name =  ctx.request.body.id;
    const pass = ctx.request.body.password;
    console.log(name,pass);
    await userModel.findDataByName(name)
        .then(result => {
            let res = result
            console.log(result);
            if (name === res[0]['Student_num'] && md5(pass) === res[0]['Password']) {
                ctx.body = {state:1,msg:'登陆成功'};
                ctx.session.user = res[0]['Student_name']
                ctx.session.id = res[0]['Student_num']
                console.log('ctx.session.id', ctx.session.id)
                console.log('session', ctx.session)
                console.log('登录成功')
            }else{
                ctx.body = {state:3,msg:'登陆失败，用户名或密码错误!'};
                console.log('用户名或密码错误!')
            }
        }).catch(err => {
            console.log(err)
            ctx.body = {state:3,msg:'登陆失败，用户名或密码错误!'};
        })
});

router.post('/signin/teacher',async (ctx) => {
    const id =  ctx.request.body.id;
    const pass = ctx.request.body.password;
    console.log(id,pass);
    await userModel.findTeacherData(id)
        .then(result => {
            let res = result;
            console.log(res);
            console.log(res[0]['Admin_name'],res[0]['Admin_password']);
            if (id == res[0]['Admin_name'] && md5(pass) == res[0]['Admin_password']) {
                ctx.body = {state:1,msg:'登陆成功'};
                ctx.session.user = res[0]['Admin_name']
                ctx.session.id = res[0]['Admin_name']
                console.log('ctx.session.id', ctx.session.id)
                console.log('session', ctx.session)
                console.log('登录成功')
            }else{
                ctx.body = {state:3,msg:'登陆失败，用户名或密码错误!'};
                console.log('用户名或密码错误!')
            }
        }).catch(err => {
            console.log(err)
            ctx.body = {state:3,msg:'登陆失败，用户名或密码错误!'};
        })
});
router.post('/changepsw',async (ctx) => {
  const id =  ctx.request.body.id;
  const oldPass = ctx.request.body.oldPassword;
  const newPass = ctx.request.body.newPassword;
  console.log(id,oldPass);
  await userModel.findDataByName(id)
      .then( async result => {
          let res = result;
          console.log(res[0]['Student_num'],res[0]['Password']);
          if (md5(oldPass) == res[0]['Password']) {
              const np = md5(newPass);
              console.log(np,id)
              await userModel.updatePsw([np,id])
              .then(result_2 => {
                let res_2 = result_2;
                ctx.body = {state:1,msg:'修改密码成功'}
                console.log('修改用户'+id+'密码成功',res_2)
              });
          }else{
              ctx.body = {state:3,msg:'用户信息存在错误，修改密码失败'};
              console.log('修改密码错误!')
          }
      }).catch(err => {
          console.log(err)
          ctx.body = false
      })
});
router.post("/signup", async ctx => {
    let user = {
      id: ctx.request.body.id,
      pass: ctx.request.body.password,
      passport:ctx.request.body.passport
    };
    console.log(user);
    await userModel.findDataByName(user.id).then(async result => {
      if (result.length) {
        try {
          throw Error("用户已经存在");
        } catch (error) {
          //处理err
          console.log(error);
        }
        //用户已存在
        ctx.body = {
          state: 3,
          message: "该用户已经存在，请重新注册"
        };
      } else {
        await userModel
          .insertData([
            user.id,
            md5(user.pass),
            moment().format("YYYY-MM-DD HH:mm:ss"),
            user.passport
          ])
          .then(res => {
            console.log("注册成功", res);
            //注册成功
            ctx.body = {
              state: 1,
              message: "注册成功"
            };
          });
      }
    });
  });
  router.post("/signup/teacher", async ctx => {
    let user = {
      tid: ctx.request.body.id,
      pass: ctx.request.body.password,
      name:ctx.request.body.name,
      repeatpass: ctx.request.body.repeatpass
    };
    console.log(user);
    await userModel.findTeacherData(user.tid).then(async result => {
      console.log(result.length);
      if (result.length) {
        try {
          throw Error("用户已经存在");
        } catch (error) {
          //处理err
          console.log(error);
        }
        //用户已存在
        ctx.body = {
          data: 1,
          message: "该用户已经存在，请重新注册"
        };
      } else {
        await userModel
          .insertTeacherData([
            user.tid,
            user.name,
            md5(user.pass),
          ])
          .then(res => {
            console.log("注册成功", res);
            //注册成功
            ctx.body = {
              data: 3,
              message: "注册成功"
            };
          });
      }
    });
  });
module.exports = router