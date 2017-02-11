import {serialize} from 'components/data-format/jao';
import {DataPolisher} from 'components/data-polisher';
import mongoose from 'components/mongoose';

export default function (app) {
    app.data = {
        supplySerializer(data) {
            return serialize;
        },
        supplyPolisher(data) {
            // TODO: process chain of polishers
            if (data instanceof mongoose.Model) {
                return DataPolisher.get('mongoose');
            }
        },
        polish(data) {
            const polisher = this.supplyPolisher(data);
            if (polisher) {
                data = polisher.polish(data);
                return this.polish(data);
            }
            return data;
        },
        serialize(data) {
            const serializer = this.supplySerializer(data);
            if (serializer) {
                return serializer(this.polish(data));
            }
            return data;
        }
    };
};