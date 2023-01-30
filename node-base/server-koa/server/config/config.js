module.exports = {
    environment: 'dev',
    database: {
      dbName: 'sequelizedemo',
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'root'
    },
    security: {
      secretKey: "secretKey",
      // 过期时间 1小时
      expiresIn: 60 * 60
    }
  }
  