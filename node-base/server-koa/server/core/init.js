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
    }

    static loadConfig() {
        console.log('loadConfig');
    }

    static loadHttpException() {
        console.log('loadHttpException');
    }
}