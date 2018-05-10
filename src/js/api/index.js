/* global __USE_MOCKED_API__ */
/* __USE_MOCKED_API__ is defined using webpack during build */
import * as devApi from './dev/bookingApi';
import * as prodApi from './prod/bookingApi';

export default __USE_MOCKED_API__ ? devApi : prodApi;
