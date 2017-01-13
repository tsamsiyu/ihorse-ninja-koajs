import _ from 'lodash';

function JAOPicker(resourceSpecification, mock) {
    this.specification = resourceSpecification;
    this.mock = mock;
}

JAOPicker.prototype.getType = function () {
    return this.specification.type;
};

JAOPicker.prototype.getPickerForRelationshipMock = function (relationshipName, mock) {
    const relationshipType = this.getRelationshipType(relationshipName);
    return this.specification.manager.getPickerFor(relationshipType, mock);
};

JAOPicker.prototype.getRelationshipType = function (relationshipName) {
    if (typeof this.specification.relationshipsSerializers === 'object') {
        if (this.specification.relationshipsSerializers[relationshipName]) {
            const typeValue = this.specification.relationshipsSerializers[relationshipName];
            if (typeof typeValue === 'object') {
                return typeValue.type; // expects serializer
            } else {
                return typeValue;
            }
        }
    }
};

JAOPicker.prototype.getId = function () {
    return _.get(this.mock, this.specification.id, null);
};

JAOPicker.prototype.getAttributes = function () {
    return _.pick(this.mock, this.specification.attributes, []);
};

JAOPicker.prototype.getRelationships = function () {
    const jaoRelationships = {};
    Object.keys(this.specification.relationships).map((relationshipName) => {
        const relationship = _.get(this.mock, relationshipName);
        if (_.isArray(relationship)) {
            jaoRelationships[relationshipName] = {data: []};
            relationship.map((relationshipItem) => {
                const relationshipJaoPicker = this.getPickerForRelationshipMock(relationshipName, relationshipItem);
                jaoRelationships[relationshipName].data.push({
                    type: relationshipJaoPicker.getType(),
                    id: relationshipJaoPicker.getId()
                });
            });
        } else if (_.isObjectLike(relationship)) {
            const relationshipJaoPicker = this.getPickerForRelationshipMock(relationshipName, relationship);
            jaoRelationships[relationshipName] = {data: {
                type: relationshipJaoPicker.getType(),
                id: relationshipJaoPicker.getId(),
            }};
        }
    });
    return jaoRelationships;
};