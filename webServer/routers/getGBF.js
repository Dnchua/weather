let cook = '_ga=GA1.2.297482068.1521093906; t=dummy; access_gbtk=a49846f8b9c39ba697b8bcb873709ecf1f992a90; access_gbtk=a49846f8b9c39ba697b8bcb873709ecf1f992a90; _gid=GA1.2.632873141.1543130648; midship=PCpWMio-L2R3ZzZJcTQ4ODJnd3R4TlFnS3VRY0FBdTJPU3I5SWZoazcwVDYrSTVXWkYydVBLRGtLc3dXeWt3b0NBa2x0RHYxdGFGSkFVN2Z0NlpRVkR3bkpoeXZtamhnQTVIeFZTQTVab1htQ25oc1RkRGtrdGlJcGNVT3BWbUh0N2hDRlp3d3FhTUxzRHp6NTVYYzRQaUVvTFNHNDRkNC9ldll6dTI0WW5BaGZ5bkRxMlpkMG5XcSsxdERJdXRQVTQvUzgxRUw0T0RoN2htZkcrb2RETlNYMGJYYWFibFZYd0RieDFBSnVzMExJb3plMUc4dHdPdGMrOWhZN0dUQUpLR0lGNENLV090Zmp0azVXckNlMjU2bkUyckRGeEZxQ2xUSm94aDRaRlc1Y2ZId2Z1WGhvUjVRS3ArdEsvbklUbmxEdldqK050eTBKSy8vNzZ2YnZVd3JDZThOS3JRT2ZKUkZ4OUZwMGRJS2N3d2pNZzJuL0dBbnQwR2k0OEM3VzRDTEdGQ21kT1lrQitsbGRSeDNoTmN4bVBTQkwvT1FvZzdTcDh4SDhSZjhpU2dCem1vSE01eE5WZ0FyNnY3cFVqSEE2MmdaOWJMUm16cWl3SDdkdEpiL0tCOS84SXkwZnA5QW52WDZObUZNRTczcnFMYlNYOWxOc0RoWVVyVTZqZ2wweXhtK0Z4azJRSVpra3BmRU5jRGVqeEliQ2QzR2w2WVJvUEdTMDhPUWx4SEVzPXp5aVEyaVJHamhQeWxFZnVubmxLRlVZdWh1dndCMExQeF85ZFhYU2xFMlk';
const router = require('koa-router')();
const userModel = require('../lib/mysql.js')
const md5 = require('md5');
const http = require('http');
const superagent = require('superagent');
const url = 'http://game.granbluefantasy.jp/teamraid041/rest_ranking_user/detail/3';
router.get('/getGBF',async (ctx) => {
    await superagent.get(url)
            .set('Cookie',cook)
            .end(function(err,res){
                if(err){
                console.log(err);
                }
                ctx.body = JSON.parse(res.text);
            })
    // await userModel.findDataByName(name)
    //     .then(result => {
    //         let res = result
    //         if (name === res[0]['name'] && md5(pass) === res[0]['pass']) {
    //             ctx.body = true;
    //             ctx.session.user = res[0]['name']
    //             ctx.session.id = res[0]['id']
    //             console.log('ctx.session.id', ctx.session.id)
    //             console.log('session', ctx.session)
    //             console.log('登录成功')
    //         }else{
    //             ctx.body = false;
    //             console.log('用户名或密码错误!')
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //         ctx.body = false
    //     })
});
module.exports = router