import validationManager from 'validate.js';
import uniqueValidator from 'components/validation/unique';
import datetimeValidator from 'components/validation/datetime';
import presenceValidator from 'components/validation/presence';

validationManager.async.options = {
    cleanAttributes: false
};

validationManager.extend(validationManager.validators.datetime, datetimeValidator);
validationManager.validators.unique = uniqueValidator;
validationManager.validators.presence = presenceValidator;

export default validationManager;