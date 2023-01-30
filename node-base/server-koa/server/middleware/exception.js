
const errorHandler = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.body = {
            msg: "系统错误！",
            error_code: 9999,
            request: `${ctx.method} ${ctx.path}`
        }
        ctx.response.status = 500
    }
}

module.exports = errorHandler
