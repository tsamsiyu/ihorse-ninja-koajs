import DataPolisher from 'components/data-polisher';
import Serializable from 'components/jao/serializable';
import SerializableList from 'components/jao/serializable-list';

export default class MongoosePolisher extends DataPolisher {
    polish(data) {
        this.id('_id');
        this.ignore('__v');
        return super.polish(...arguments);
    }
    polishArray() {
        return new SerializableList(super.polishArray(...arguments));
    }
    handlePolishedObject(hash, object) {
        return new Serializable(object.constructor.collection.name, hash);
    }
    toPlainObject(object) {
        return object.toObject();
    }
}