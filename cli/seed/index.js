import marksSeeds from 'seed/marks';
import countriesSeeds from 'seed/countries';
import Mark from 'pods/vehicles/mark';
import Country from 'pods/countries/country';

function seedIt(model, seeds) {
    const name = model.modelName;
    console.log(`\t-> '${name}' seed started`);
    model.collection.drop();
    return new Promise((resolve, reject) => {
        // console.log(seeds);
        model.insertMany(seeds/*, (errs, docs) => {
            if (errs) {
                console.log(`\t-> '${name}' seed failed`);
                reject(errs);
            } else {
                console.log(`\t-> '${name}' seed finished`);
                resolve(docs);
            }
        }*/).then((docs) => {
            console.log(`\t-> '${name}' seed finished`);
            resolve(docs)
        }).catch((errs) => {
            console.log(`\t-> '${name}' seed failed`);
            reject(errs);
        });
        /*model.collection.insert(seeds, (errs, docs) => {
            if (errs) {
                console.log(`\t-> '${name}' seed failed`);
                reject(errs);
            } else {
                console.log(`\t-> '${name}' seed finished`);
                resolve(docs);
            }
        })*/
    });
}

export default function () {
    console.log('-> seed started');

    seedIt(Country, countriesSeeds).then((countries) => {
        seedIt(Mark, marksSeeds()).then(() => {
            console.log('-> seed finished');
        });
    });
};