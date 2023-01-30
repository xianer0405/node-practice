const koaRouter = require('koa-router')
const UserValidator = require('../../validators/user')

const router = new koaRouter({
    prefix: '/api/v1/user'
})

router.post('/register', async (ctx) => {
    console.log('post register', 'body', ctx.request.body);
    const user = ctx.request.body
    UserValidator.validate(user).then(() => {
        ctx.body = 'validate successfully'
    }).catch(({errors, fields}) => {
        console.log('errors=', errors);
        const { message , field } = errors[0];
        ctx.response.status = 400;
        ctx.body = `${field} field's value is invalid, error is ${message}`;
    });
})

module.exports = router