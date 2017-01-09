import validationManager from 'validate.js';
import uniqueValidator from 'components/validator/unique';
import datetimeValidator from 'components/validator/datetime';
import presenceValidator from 'components/validator/presence';

validationManager.async.options = {
    cleanAttributes: false
};

validationManager.extend(validationManager.validators.datetime, datetimeValidator);
validationManager.validators.unique = uniqueValidator;
validationManager.validators.presence = presenceValidator;

export default validationManager;