import marksSeeds from 'seed/marks';
import Mark from 'pods/vehicles/mark';

function seedIt(model, seeds) {
    const name = model.modelName;
    console.log(`\t-> '${name}' seed started`);
    model.remove();
    model.insertMany(seeds);
    console.log(`\t-> '${name}' seed finished`);
}

export default function () {
    console.log('-> seed started');

    seedIt(Mark, marksSeeds);

    console.log('-> seed finished');
};