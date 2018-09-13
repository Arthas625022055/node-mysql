// 加载mysql模块
var mysql = require('mysql');
// 错误处理
var errHandler = function (err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
}
// 创建连接
var connection = mysql.createConnection({
  // 此处的host为数据库地址，如果服务器环境，直接写上localhost,如果是本地环境，自己玩的话，可以把数据库的外网访问打开，得到一个地址
  host: 'localhost',
  // 登录数据库的用户名
  user: 'root',
  // 登录数据库的密码
  password: 'yl110190',
  // 库名
  dataBase: 'test',
  // 端口号
  port: '62071'
});
//执行创建连接 
connection.connect(err => {
  // 打印连接报错
  console.log(err)
});
//SQL语句
// 创建库
var creat = 'CREATE DATABASE testData';
// 使用库
var use = 'use testData';
// 创建表
var sqlTable = 'CREATE TABLE html_table(' + // 括号以后定义表的字段
                'id INT NOT NULL AUTO_INCREMENT,' +
                'title VARCHAR(100),' +
                'content TEXT,' +
                'date DATETIME,' +
                'timestamp TIMESTAMP,' +
                'PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;'
// 插入数据（增）
var insertData = 'INSERT INTO html_table' +
                 '(title, content)' + // 字段名
                 'VALUES' +
                 '(?,?)' // 值，值和字段一一对应
// 删除数据（删）
var delData = 'DELETE FROM html_table WHERE id = ?'
// 修改数据，参数为list（改）
var changeData = 'UPDATE html_table SET title = ?, content = ? WHERE id = ?'
// 查询数据（查）
var queryData = 'SELECT * FROM html_table'

// 调用的方法
// 使用表
connection.query(use, errHandler)
// 插入数据,第一个参数为sql语句，第二个参数为数组,和sql语句字段一一对应
connection.query(insertData, ['titleVal', 'contentVal'], errHandler)
// 删除数据,参数一般为id值（id唯一性）,会删除对应的一条数据
connection.query(delData, 2, errHandler)
// 改变数据,参数同插入数据,但是一般一定要传id作为查找的唯一标志
connection.query(changeData, ['titleVal2', 'contentVal2'], errHandler)
// 查询数据
connection.query(queryData, (err, result) => {
  if (err) {
    console.log(err)
  } else {
    console.log(JSON.parse(JSON.stringify(result))) // 不做json格式化返回的数据会带RowDataPacket, 通过格式化可以去掉
  }
})
// node.js mysql参考文档
