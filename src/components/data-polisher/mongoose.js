import DataPolisher from 'components/data-polisher';
import Serializable from 'components/jao/serializable';

export default class MongoosePolisher extends DataPolisher {
    polish(data) {
        this.id('_id');
        this.ignore('__v');
        return super.polish(...arguments);
    }
    handlePolishedData(hash, data) {
        const object = Array.isArray(data) ? data[0] : data;
        return new Serializable(object.constructor.collection.name, hash);
    }
    toPlainObject(object) {
        return object.toObject();
    }
}