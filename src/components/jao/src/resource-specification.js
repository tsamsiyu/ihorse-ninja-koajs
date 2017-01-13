import _ from 'lodash';
import JAO from 'jao';

function ResourceSpecification(manager, type, specification) {
    this.manager = manager;
    this.type = type;
    this.id = 'id';
    if (typeof specification === 'object') {
        if (specification.id) this.id = specification.id;
        this.attributes = specification.attributes || [];
        this.relationships = specification.relationships || [];
        this.relationshipsSerializers = specification.relationshipsSerializers || {};
        this.included = [];
    }
}

// TODO: think about make it immutable
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
    const jaoPicker = this.manager.getPickerFor(this.type);
    const jaFormat = {data: {}, included: []};
    jaFormat.data.id = jaoPicker.getId();
    jaFormat.data.attributes = jaoPicker.getAttributes();
    jaFormat.data.relationships = jaoPicker.getRelationships();
    this.included.forEach((relationshipName) => { // TODO: take deep relationship into account
        const relationshipMock = mock[relationshipName];
        const relationshipResourceSpecification = this.getRelationshipResourceSpecification(relationshipName);
        const relationshipJaFormat = relationshipResourceSpecification.serialize(relationshipMock);
        jaFormat.included.push(relationshipJaFormat);
    });
    return new JAO(jaFormat);
};

ResourceSpecification.prototype.serializeCollection = function (mocks) {
};

