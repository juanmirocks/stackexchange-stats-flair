import { ReqParams } from "./dataTypes.ts";
import { require } from "./utils.ts";

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
  const userPayload = _TEST_SO_USER_PAYLOAD[params.userId] || _TEST_SO_USER_PAYLOAD[1];
  return Promise.resolve(userPayload);
}

const _TEST_SO_USER_PAYLOAD: any = {
  1: {
    "items": [
      {
        "badge_counts": {
          "bronze": 153,
          "silver": 149,
          "gold": 48,
        },
        "account_id": 1,
        "is_employee": false,
        "last_modified_date": 1677542701,
        "last_access_date": 1678561454,
        "reputation_change_year": 160,
        "reputation_change_quarter": 160,
        "reputation_change_month": 50,
        "reputation_change_week": 0,
        "reputation_change_day": 0,
        "reputation": 63081,
        "creation_date": 1217514151,
        "user_type": "registered",
        "user_id": 1,
        "accept_rate": 100,
        "location": "El Cerrito, CA",
        "website_url": "https://blog.codinghorror.com/",
        "link": "https://stackoverflow.com/users/1/jeff-atwood",
        "profile_image":
          "https://www.gravatar.com/avatar/51d623f33f8b83095db84ff35e15dbe8?s=256&d=identicon&r=PG",
        "display_name": "Jeff Atwood",
      },
    ],
    "has_more": false,
    "quota_max": 10000,
    "quota_remaining": 9955,
  },

  10: {
    "has_more": false,
    "items": [
      {
        "account_id": 8,
        "badge_counts": {
          "bronze": 1,
          "gold": 0,
          "silver": 3,
        },
        "creation_date": 1217541426,
        "display_name": "Sneakers O&#39;Toole",
        "is_employee": false,
        "last_access_date": 1622734268,
        "last_modified_date": 1560222690,
        "link": "https://stackoverflow.com/users/10/sneakers-otoole",
        "location": "Morganton, North Carolina United States",
        "profile_image":
          "https://www.gravatar.com/avatar/f82fc4a2bfc73434ac4899690926c8a0?s=256&d=identicon&r=PG",
        "reputation": 101,
        "reputation_change_day": 0,
        "reputation_change_month": 0,
        "reputation_change_quarter": 0,
        "reputation_change_week": 0,
        "reputation_change_year": 0,
        "user_id": 10,
        "user_type": "registered",
        "website_url": "https://www.youtube.com/watch?v=OcSKd13mKUY",
      },
    ],
    "quota_max": 300,
    "quota_remaining": 291,
  },

  //Without `collectives` field
  22656: {
    "has_more": false,
    "items": [
      {
        "accept_rate": 86,
        "account_id": 11683,
        "badge_counts": {
          "bronze": 9154,
          "gold": 856,
          "silver": 9071,
        },
        "creation_date": 1222430705,
        "display_name": "Jon Skeet",
        "is_employee": false,
        "last_access_date": 1680010777,
        "last_modified_date": 1679947509,
        "link": "https://stackoverflow.com/users/22656/jon-skeet",
        "location": "Reading, United Kingdom",
        "profile_image":
          "https://www.gravatar.com/avatar/6d8ebb117e8d83d74ea95fbdd0f87e13?s=256&d=identicon&r=PG",
        "reputation": 1393793,
        "reputation_change_day": 199,
        "reputation_change_month": 5196,
        "reputation_change_quarter": 16429,
        "reputation_change_week": 588,
        "reputation_change_year": 16429,
        "user_id": 22656,
        "user_type": "registered",
        "website_url": "http://csharpindepth.com",
      },
    ],
    "quota_max": 300,
    "quota_remaining": 290,
  },
};
