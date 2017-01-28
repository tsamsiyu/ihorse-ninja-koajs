export function isScalar(value) {
    const type = typeof value;
    return type === 'string' || type === 'number' || type === 'boolean';
}

export function isScalarType(value) {
    const type = typeof value;
    return isScalar(value) || value instanceof Date;
}