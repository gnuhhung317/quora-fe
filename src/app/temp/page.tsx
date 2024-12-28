// @ts-nocheck
import axios, { AxiosInstance } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
    getLongToken,
    getToken,
    logout,
    saveToken,
} from '../base-global/storage/authStorage';
import {
    getLocalStorageByName,
    saveLocalStorage,
} from '../base-global/storage/localStorage';
import { CLIENT_ID } from '../base-global/constants/key';
import { API } from '../../services/resource';

import { refreshToken } from './services/user';
import notification from '../base-global/utils/notification';
import {
    REACT_APP_CORE_API,
    REACT_APP_STATICS_API,
} from '../base-global/constants/serverConfig';
import { getMessageResponse } from '../base-global/utils/service';

axios.defaults.headers.common['Accept'] = 'application/json'; // low priority
axios.defaults.headers.common['Accept-Language'] = 'vi'; // low priority

const processRefreshToken = async (urlRequest, resend, response, instant) => {
    if (
        urlRequest?.includes(API.SIGN_IN) ||
        urlRequest?.includes(API.REFRESH_TOKEN)
    ) {
        return response;
    }
    if (resend || urlRequest?.includes(API.REFRESH_TOKEN)) {
        logout({ reason: 'expired' });
        return response;
    }
    const long_token = getLongToken();
    if (long_token) {
        try {
            const res = await refreshToken({ refreshToken: long_token });
            const newToken = res?.data?.data?.accessToken;
            if (!newToken) {
                logout({ reason: 'expired' });
                return;
            }
            saveToken(newToken);
            response.config.headers.Authorization = `Bearer ${newToken}`;
            response.config.headers.resend = true;
            return instant(response.config);
        } catch (error) {
            logout({ reason: 'expired' });
            return Promise.reject(error);
        }
    } else {
        notification.warning('Phiên đăng nhập hết hạn');
        logout({ reason: 'expired' });
        return;
    }
};

const addInterceptor = (instant: AxiosInstance) => {
    instant.interceptors.request.use(
        (config) => {
            if (
                !config?.headers?.Authorization &&
                !config?.url?.includes(API.SIGN_IN)
            ) {
                const token = getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                } else if (!config.headers.Authorization) {
                    delete config.headers.Authorization;
                }
            }
            const client_id = getLocalStorageByName(CLIENT_ID);
            config.headers.organizationCode = 'ROX';
            if (!client_id) {
                const newClientId = uuidv4();
                config.headers.client_id = newClientId;
                saveLocalStorage(CLIENT_ID, newClientId);
            } else {
                config.headers.client_id = client_id;
            }

            return config;
        },
        (err) => Promise.reject(err),
    );

    instant.interceptors.response.use(
        async (response: any) => {
            const { code } = response?.data || {};
            if (
                code === 403 ||
                code === 401 ||
                (code === 500 && !response.config.headers.Authorization)
            ) {
                return processRefreshToken(response.config.url,
                    response.config.headers.resend,
                    response,
                    instant,
                );
            }
            return response;
        },
        async (error) => {
            const { data } = error.response || {};
            const code = error.response?.code || error?.status;
            switch (code) {
                case 401:
                    return processRefreshToken(
                        error.config.url,
                        error.config.headers.resend,
                        error.response,
                        instant,
                    );
                // error({ statusCode: 401 });
                case 403:
                    // error({ statusCode: 403 });
                    // return processRefreshToken(
                    //   error.config.url,
                    //   error.config.headers.resend,
                    //   error.response,
                    //   instant,
                    // );
                    break;
                case 429:
                    console.log('manyAction');
                    break;
                case 404:
                    if (data?.message) {
                        console.error(data?.message);
                    } else {
                        console.log('NotFound');
                    }
                    break;
                case 400:
                case 432:
                    notification.error(getMessageResponse(error.response));
                    if (data?.message) {
                        console.error(data?.message);
                    } else {
                        console.log('showInternalServerError');
                    }
                    break;
                case 406:
                    return Promise.reject(
                        new Error('Bạn không có quyền truy cập tính năng này'),
                    );
                case 422:
                case 1:
                    break;
                default:
                    console.log('Failed');
                    break;
            }
            return Promise.reject(error);
        },
    );
};

function createInstance(api: string) {
    const instant: AxiosInstance = axios.create({
        baseURL: api,
    });

    addInterceptor(instant);

    return instant;
}

export const instanceCoreApi = createInstance(REACT_APP_CORE_API);
export const instanceStaticsApi = axios.create({
    baseURL: REACT_APP_STATICS_API,
});

export default function setupAxiosDefault() {
    axios.defaults.baseURL = REACT_APP_CORE_API;
    addInterceptor(axios);
}