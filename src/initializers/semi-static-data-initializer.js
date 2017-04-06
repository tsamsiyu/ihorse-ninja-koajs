import SemiStaticData from 'components/semi-static-data';
import Mark from 'pods/vehicles/mark';
import Country from 'pods/countries/country';

export default function (app, cb) {
    app.semiStaticData = new SemiStaticData(app.runCache);
    app.semiStaticData.register(Mark);
    app.semiStaticData.register(Country);
    cb();
};