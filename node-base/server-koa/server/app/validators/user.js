const Schema = require('async-validator').default
console.log(Schema)
const descriptor = {
    username: [
        { type: 'string', min: 2, max: 6, message: '昵称长度必须在2~16之间' }
    ],
    email: [
        { type: 'string', required: true, message: '电子邮箱不符合规范，请输入正确的邮箱' }
    ],
    password: [
        { type: 'string', min: 6, max: 18, message: '密码至少6个字符, 最多22个字符' },
        { type: 'string', regexp: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]', message: '密码长度必须在6~22位之间，包含字符、数字和 _ ' }
    ],
    confirmPassword: [
        { type: 'string', min: 6, max: 18, message: '密码至少6个字符, 最多22个字符' },
        { type: 'string', regexp: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]', message: '密码长度必须在6~22位之间，包含字符、数字和 _ ' },
        { 
            validator(rule, value, callback, source, options) {
                console.log(rule, value, source, options)
                callback()
            }
        }
    ]

};
const validator = new Schema(descriptor);

module.exports = validator;