// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}

import api from './api.js';
import mockApi from './api.mock.js';

const useMock = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_USE_MOCK === 'TRUE';

export default useMock ? mockApi : api;
