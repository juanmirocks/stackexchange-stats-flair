/**
 * Fetch SE user's information; https://api.stackexchange.com/docs/users-by-ids
 * @param params
 * @returns async response
 */
export function fetchData(params: any): Promise<any> {
  const targetUrl =
    `https://api.stackexchange.com/2.3/users/${params.userId}?site=${params.site}`;

  return fetch(targetUrl, {
    headers: {
      accept: "application/json",
    },
  }).then(resp => resp.json());
}

export function fetchDataTest(params: any): Promise<any> {
  return Promise.resolve(TEST_SO_RESPONSE);
}

export const TEST_SO_RESPONSE: any = JSON.parse(`
{
  "items": [
    {
      "badge_counts": {
        "bronze": 153,
        "silver": 149,
        "gold": 48
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
      "profile_image": "https://www.gravatar.com/avatar/51d623f33f8b83095db84ff35e15dbe8?s=256&d=identicon&r=PG",
      "display_name": "Jeff Atwood"
    }
  ],
  "has_more": false,
  "quota_max": 10000,
  "quota_remaining": 9955
}`);
