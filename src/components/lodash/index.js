import _ from 'lodash';
import lodashInflection from 'lodash-inflection';
import assignSafe from 'components/lodash/assign-safe';

_.mixin({assignSafe});
_.mixin(lodashInflection);

export default _;