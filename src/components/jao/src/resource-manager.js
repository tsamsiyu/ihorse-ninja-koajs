import ResourceSpecification from 'resource-specification';

function ResourceManager () {

}

ResourceManager.prototype.register = function (type, specification) {
    if (!specification instanceof ResourceSpecification) {
        specification = new ResourceSpecification(specification);
    }
    this.specifications[type] = specification;
};