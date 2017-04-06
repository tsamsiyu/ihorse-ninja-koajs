import marksSeeds from 'seed/marks';
import countriesSeeds from 'seed/countries';
import Mark from 'pods/vehicles/mark';
import Country from 'pods/countries/country';
import async from 'async';

function seedIt(model, seeds) {
    return new Promise((resolve, reject) => {
        model.deleteMany({}, (e) => {
            if (e) return reject(e);
            model.insertMany(seeds, (e, records) => {
                if (e) return reject(e);
                resolve(records);
            });
        });
    });
}

export default function (app, finish) {
    app.logger.info('-> seed started');

    async.reduce([
        [Country, countriesSeeds],
        [Mark, marksSeeds]
    ], {},
        (memo, item, cb) => {
            let [model, seeds] = item;
            try {
                seeds = typeof seeds === 'function' ? seeds(memo) : seeds;
            } catch (e) {
                cb(e);
            }
            const start = new Date();
            seedIt(model, seeds)
                .then((inserted) => {
                    const time = (new Date()).getTime() - start.getTime();
                    app.logger.info(`  -> ${model.collection.name} seeded in ${time} ms`);
                    memo[model.collection.name] = inserted;
                    cb(null, memo);
                })
                .catch(err => cb(err));
        },
        (err, results) => {
            if (err) {
                app.logger.error('-> seed failed', err);
            } else {
                app.logger.info('-> seed finished');
            }
            finish();
        }
    );
};