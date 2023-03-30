import { ReqParams } from "./dataTypes.ts";
import { require } from "./utils.ts";
import { TEST_SO_USERS_PAYLOAD } from "./testSePayloads.ts";
import { _SE_MY_STACKAPP_KEY } from "./secrets.ts";


const _SE_MY_STACKAPP_KEY_QUERY_PARAM = (_SE_MY_STACKAPP_KEY) ? `&key=${_SE_MY_STACKAPP_KEY}` : '';


/**
 * Fetch SE user's information; https://api.stackexchange.com/docs/users-by-ids
 * @param params
 * @returns async response
 */
export function fetchSeUserData(params: ReqParams): Promise<any> {
  const targetUrl =
    `https://api.stackexchange.com/2.3/users/${params.user_id}?site=${params.site}${_SE_MY_STACKAPP_KEY_QUERY_PARAM}`;

  return fetch(targetUrl, {
    headers: {
      accept: "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((payload) => {
      require(
        payload.items && payload.items.length == 1,
        `Did not get any valid user data: ${JSON.stringify(payload)}`,
      );
      return payload;
    });
}


export function fetchSeUserDataTest(params: ReqParams): Promise<any> {
  const userPayload = TEST_SO_USERS_PAYLOAD[params.user_id] ||
    TEST_SO_USERS_PAYLOAD[1];
  return Promise.resolve(userPayload);
}
