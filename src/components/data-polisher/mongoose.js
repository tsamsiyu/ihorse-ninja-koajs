import DataPolisher from 'components/data-polisher';
import Serializable from 'components/jao/serializable';

export default class MongoosePolisher extends DataPolisher {
    polish(data) {
        this.id('_id');
        this.ignore('__v');
        return super.polish(...arguments);
    }
    handlePolishedObject(hash, object) {
        return new Serializable(object.constructor.collection.name, hash);
    }
    toPlainObject(object) {
        return object.toObject();
    }
}