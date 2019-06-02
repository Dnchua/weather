var mysql = require("mysql");
var config = require("../lib/config.js");

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});

let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

let users = `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     pass VARCHAR(100) NOT NULL,
     moment VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`;

let teachers = `create table if not exists teachers(
 id INT NOT NULL AUTO_INCREMENT,
 tid VARCHAR(100) NOT NULL,
 pass VARCHAR(100) NOT NULL,
 name VARCHAR(100) NOT NULL,
 moment VARCHAR(100) NOT NULL,
 PRIMARY KEY ( id )
);`;

let createTable = function(sql) {
  return query(sql, []);
};

createTable(users);
createTable(teachers);

// 注册用户
let insertData = function(value) {
  let _sql = "insert into t_student set Student_num=?,Password=?,Create_date=?,Passport=?;";
  return query(_sql, value);
};
//注册教师账户
let insertTeacherData = function(value) {
  let _sql = "insert into t_admin set Admin_id=?,Admin_name=?,Admin_password=?;";
  return query(_sql, value);
};


// 删除用户
let deleteUserData = function(name) {
  let _sql = `delete from users where name="${name}";`;
  return query(_sql);
};
// 查找学生用户
let findUserData = function(name) {
  let _sql = `select * from t_student where Student_num="${name}";`;
  return query(_sql);
};
//查找教师用户
let findTeacherData = function(id) {
  let _sql = `select * from t_admin where Admin_name="${id}";`;
  return query(_sql);
};
//查找学生成绩
let findScoreData = function(id) {
  let _sql = `SELECT
      s.course_id,
      c.course_name,
      s.student_num,
      t.student_name,
      s.score 
    FROM
      score s
      JOIN student t ON t.student_num = s.student_num
      JOIN course c ON c.course_id = s.course_id 
    WHERE
      s.student_num = "${id}";`;
  return query(_sql);
};
//查找学生某一科的成绩
let findScoreDataByCoursename = function(id, coursename) {
  let _sql = `SELECT
        s.course_id,
        c.course_name,
        s.student_num,
        t.student_name,
        s.score 
      FROM
        score s
        JOIN student t ON t.student_num = s.student_num
        JOIN course c ON c.course_id = s.course_id 
      WHERE
        s.student_num = "${id}" and c.course_name like "%${coursename}%";`;
  return query(_sql);
};
//获取所有学生得成绩
let findAllScoreData = function() {
  let _sql = `SELECT
        s.course_id,
        c.course_name,
        s.student_num,
        t.student_name,
        s.score 
      FROM
        score s
        JOIN student t ON t.student_num = s.student_num
        JOIN course c ON c.course_id = s.course_id ;`;
  return query(_sql);
};
//查找用户信息
let findUserInfo = function(id) {
  let _sql = `select * from student where student_num="${id}";`;
  return query(_sql);
};

// 通过名字查找用户
let findDataByName = function(name) {
  let _sql = `select * from t_student where Student_num="${name}";`;
  return query(_sql);
};

//获取图书所有种类
let findBookTypeList = function() {
  let _sql = `select * from t_type`;
  return query(_sql);
}

//插入图书信息
let insertBook = function(value) {
  let _sql = "insert into t_book set Book_name=?,Writer=?,Price=?,Pub_company=?,Total_num=?,Buy_date=?;";
  return query(_sql, value);
};

//根据图书种类搜图书
let findBookByType = function(type) {
  let _sql = `SELECT
  *
FROM
  t_book s
  JOIN t_type t ON t.Sort_id = s.Sort_id
WHERE
  s.Sort_id = "${type}"`;
  return query(_sql);
};

//删除图书
let deleteBook = function(value) {
  let _sql = "delete from t_book where Book_num in ?"
  return query(_sql, value);
};

//获取首页推荐图书
let getFirstPageBook = function() {
  let _sql = "select * from t_book limit 1,10";
  return query(_sql);
}

//获取用户借阅的图书信息
let getBorrowBook = function (value) {
  let _sql = "SELECT * from t_book_student s join t_book b on s.Book_num=b.Book_num where s.Student_num=?";
  return query(_sql,value)
}
//获得搜索的书籍
let getSearchBook = function (name) {
  let _sql = `SELECT * from t_book  where Book_name like "%${name}%" limit 0,10`;
  return query(_sql)
}

//更新用户密码
let updatePsw = function (values) {
  let _sql = "UPDATE t_student set Password=? where Student_num=?";
  return query(_sql,values)
}

let updateSInfo = function (values) {
  let _sql = "UPDATE t_student set Sex=?,Telephone=?,Student_name=?,Academy_id=?,Class_id=?,Email=? where Student_num=?";
  return query(_sql,values)
}

let getRecommendBook = function (values) {
  let _sql = "SELECT * from t_recommend s join t_book b on s.Book_num=b.Book_num where s.Student_num=?";
  return query(_sql,values);
}
module.exports = {
  query,
  insertData,
  createTable,
  deleteUserData,
  findUserData,
  findScoreData,
  findUserInfo,
  findScoreDataByCoursename,
  findDataByName,
  insertTeacherData,
  findTeacherData,
  // insertStudentScore,
  findAllScoreData,
  //updatetStudentScore,//上次的项目api
  findBookTypeList,
  insertBook,
  getFirstPageBook,
  getBorrowBook,
  getSearchBook,
  updatePsw,
  updateSInfo,
  getRecommendBook
};
