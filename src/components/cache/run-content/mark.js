import Mark from 'pods/vehicles/mark';

export default {
    all(app) {
        return app.runCache.provide('marks', function () {
            return Mark.find().exec();
        });
    }
}