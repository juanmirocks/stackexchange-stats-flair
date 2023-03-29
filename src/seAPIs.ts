import { ReqParams } from "./dataTypes.ts";
import { require } from "./utils.ts";
import { TEST_SO_USERS_PAYLOAD } from "./testSePayloads.ts";

/**
 * Fetch SE user's information; https://api.stackexchange.com/docs/users-by-ids
 * @param params
 * @returns async response
 */
export function fetchData(params: ReqParams): Promise<any> {
  const targetUrl =
    `https://api.stackexchange.com/2.3/users/${params.userId}?site=${params.site}`;

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

export function fetchDataTest(params: ReqParams): Promise<any> {
  const userPayload = TEST_SO_USERS_PAYLOAD[params.userId] ||
    TEST_SO_USERS_PAYLOAD[1];
  return Promise.resolve(userPayload);
}
