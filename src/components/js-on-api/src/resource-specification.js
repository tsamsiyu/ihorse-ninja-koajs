import _ from 'lodash';
import JADataPicker from 'ja-data-picker';
import JAObject from 'ja-object';

function ResourceSpecification(manager, specification) {
    this.manager = manager;
    if (typeof specification === 'object') {
        this.id = specification.id || 'id';
        this.attributes = specification.attributes || [];
        this.relationships = specification.relationships || [];
        this.included = [];
    }
}

ResourceSpecification.prototype.attributesOnly = function (list) {
    this.attributes = list;
    return this;
};

ResourceSpecification.prototype.attributesExclude = function (list) {
    this.attributes = _.difference(this.attributes, list);
    return this;
};

ResourceSpecification.prototype.relationshipsOnly = function (list) {
    this.relationships = list;
    return this;
};

ResourceSpecification.prototype.relationshipsExclude = function (list) {
    this.relationships = _.difference(this.relationships, list);
    return this;
};

ResourceSpecification.prototype.includeRelationships = function (list) {
    this.included = list;
    return this;
};

ResourceSpecification.prototype.serialize = function (mock) {
    if (mock instanceof Array) {
        return this.serializeCollection(mock);
    } else {
        return this.serializeSingle(mock);
    }
};

ResourceSpecification.prototype.serializeSingle = function (mock) {
    const jaDataPicker = new JADataPicker(this, mock);
    const jaFormat = {data: {}, included: []};
    jaFormat.data.id = jaDataPicker.getId();
    jaFormat.data.attributes = jaDataPicker.getAttributes();
    jaFormat.data.relationships = jaDataPicker.getRelationships();
    this.included.forEach((relationshipName) => { // TODO: take deep relationship into account
        const relationshipMock = mock[relationshipName];
        const relationshipResourceSpecification = this.getRelationshipResourceSpecification(relationshipName);
        const relationshipJaFormat = relationshipResourceSpecification.serialize(relationshipMock);
        jaFormat.included.push(relationshipJaFormat);
    });
    return new JAObject(jaFormat);
};

ResourceSpecification.prototype.serializeCollection = function (mocks) {
};

