import Serializable from 'components/data/serializable';
import _ from 'lodash';

export default class Errors extends Serializable {
    constructor(errors) {
        super();
        this.errors = errors;
    }
    serialize() {
        const errors = _.flatten(_.map(this.errors, (messages, attribute) => {
            return messages.map((message) => {
                return {
                    id: attribute,
                    status: 422,
                    source: { pointer: `/data/attributes/${attribute}` },
                    message
                };
            });
        }));
        return {errors};
    }
    static specificate(errors) {
        return new this(errors);
    }
}