---
id: sending-requests
title: Sending Requests
sidebar_label: Sending Requests
---

## With Interceptors

For this to work, you must call the ```makeSuper``` function using your instance of axios ([See initialisation guide](initialisation.md#call-the-makesuper-function-api-reference-api-reference-api-reference-supertokensaxiosmakesuperaxios)).

```js
import SuperTokensRequest from 'supertokens-website/axios';
import axios from "axios";
SuperTokensRequest.makeSuper(axios);

const SESSION_EXPIRED_STATUS_CODE = 440;

SuperTokensRequest.init("refreshTokenUrl", SESSION_EXPIRED_STATUS_CODE);

async function doAPICalls() {
    try {
        let postData = { ... };
        let response = await axios({url: "someAPI", method: "post", data: postData });
        let data = await response.data;
        let someField = data.someField;
    } catch (err) {
        if (err.response !== undefined && err.response.status === SESSION_EXPIRED_STATUS_CODE) {
            // redirect usee to login
        } else {
            // handle error
        }
    }
}
```

## Without Interceptors

If you choose not to call the ```makeSuper``` function, you need to change all API calls made with axios with SuperTokens function calls like so:
- ```axios("URL", config) -> SuperTokensRequest.axios("URL", config)```
- ```axios.get("URL", config) -> SuperTokensRequest.get("URL", config)```
- ```axios.post("URL", data, config) -> SuperTokensRequest.post("URL", data, config)```


#### Calling the ```axios``` function: [API Reference](../api-reference/api-reference#supertokensaxiosaxiosdata-config)

```js
SuperTokensRequest.axios("/someAPI", config);
```

- Used to send a request to your API endpoint
- Treat it like a regular ```axios``` API call

```js
import SuperTokensRequest from 'supertokens-website/axios';

const SESSION_EXPIRED_STATUS_CODE = 440;

SuperTokensRequest.init("refreshTokenUrl", SESSION_EXPIRED_STATUS_CODE)

async function doAPICalls() {
    try {
        let postData = { ... };
        let response = await SuperTokensRequest.axios({url: "someAPI", method: "post", data: postData });
        let data = await response.data;
        let someField = data.someField;
    } catch (err) {
        if (err.response !== undefined && err.response.status === SESSION_EXPIRED_STATUS_CODE) {
            // redirect usee to login
        } else {
            // handle error
        }
    }
}
```