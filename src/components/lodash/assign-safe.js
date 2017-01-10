// TODO: review do the lodash already have similar operation
export default function (data, safeKeys) {
    let safeData = {};
    Object.keys(data).forEach((key) => {
        if (safeKeys.includes(key)) {
            safeData[key] = data[key];
        }
    });
    return safeData;
};