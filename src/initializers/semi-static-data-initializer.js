import SemiStaticData from 'components/semi-static-data';
import Mark from 'pods/vehicles/mark';

export default function (app) {
    app.semiStaticData = new SemiStaticData(app.runCache);
    app.semiStaticData.register(Mark);
};