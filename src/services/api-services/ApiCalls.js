import HttpCalls from './HttpCalls';
import {headersData} from './Services';

// user login
export const _generateOtp = async body => {
  let {_api_calls} = HttpCalls;

  let headers = await headersData({});
  return _api_calls('POST', '/generate-otp', headers, body);
};
