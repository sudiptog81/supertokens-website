---
id: sending-requests
title: Sending Requests
sidebar_label: Sending Requests
---

## With Interceptors

If you set the ```viaInterceptor``` option to ```true``` when initialising SuperTokens ([See initialisation guide](initialisation.md)), the package intercepts all fetch API calls.

<span class="highlighted-text">You do not need to change any of your existing API calls for this to work</span>

```js
import SuperTokensRequest from 'supertokens-website';

const SESSION_EXPIRED_STATUS_CODE = 440;

// call this when your app starts
SuperTokensRequest.init("/refreshTokenURL", SESSION_EXPIRED_STATUS_CODE, true);

async function doAPICalls() {
    try {
        // make API call as usual
        let fetchConfig = { ... };
        let response = await fetch("/someAPI", fetchConfig);

        // handle response
        if (response.status !== 200) {
            throw response;
        }
        let data = await response.json();
        let someField = data.someField;
        // ...
    } catch (err) {
        if (err.status === SESSION_EXPIRED_STATUS_CODE) {
            // redirect user to login
        } else {
            // handle error
        }
    }
}
```

## Without Interceptors

If the ```viaInterceptor``` option is ```false``` you need to replace all ```fetch``` calls that need authentication with the ```SuperTokensRequest.fetch``` function call. 


### Calling the ```fetch``` function: [API Reference](../api-reference/api-reference#supertokensfetchfetchurl-config)

```js
SuperTokensRequest.fetch("/someAPI", config);
```

- Used to send a request to your API endpoint
- Treat it like a regular ```fetch``` API call
```js
import SuperTokensRequest from 'supertokens-website';

const SESSION_EXPIRED_STATUS_CODE = 440;
SuperTokensRequest.init("/refreshTokenURL", SESSION_EXPIRED_STATUS_CODE, false);

async function doAPICalls() {
    try {
        // make API call as usual
        let fetchConfig = { ... };
        let response = await SuperTokensRequest.fetch("/someAPI", fetchConfig);

        // handle response
        if (response.status !== 200) {
            throw response;
        }
        let data = await response.json();
        let someField = data.someField;
        // ...
    } catch (err) {
        if (err.status === SESSION_EXPIRED_STATUS_CODE) {
            // redirect usee to login
        } else {
            // handle error
        }
    }
}
```