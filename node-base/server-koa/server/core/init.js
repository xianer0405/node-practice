const KoaRouter = require('koa-router');
const requireDirectory = require('require-directory')

class AppLoader {
    static bootstrap(app) {
        AppLoader.app = app;
        AppLoader.loadRoutes();
        AppLoader.loadHttpException();
        AppLoader.loadConfig();
    }

    static loadRoutes() {
        console.log('loadRoutes');
        const apiDirectory = `${process.cwd()}/server/app/api`

        // 路由自动加载
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })

        function whenLoadModule(routerModule) {
            if (routerModule instanceof KoaRouter) {
                AppLoader.app.use(routerModule.routes());
            }
        }
    }

    static loadConfig() {
        console.log('loadConfig');
    }

    static loadHttpException() {
        console.log('loadHttpException');
    }
}

module.exports = AppLoader