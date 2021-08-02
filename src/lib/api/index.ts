import api from './api';
import mockApi from './api.mock';

const useMock = true;// __SNOWPACK_ENV__.SNOWPACK_PUBLIC_USE_MOCK === 'TRUE';

export default useMock ? mockApi : api;