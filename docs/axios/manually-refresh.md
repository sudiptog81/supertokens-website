---
id: manually-refresh
title: Manual refresh
sidebar_label: Manual refresh
---

- This is needed in case you want to call the refresh session endpoint yourself.

- You would only need to do this in certain cases, for example, if you are using a non single page application website framework or using server side rendering. Please see the [For non-SPA websites section](non-spa) for more information.

## Call the ```attemptRefreshingSession``` function: [API Reference](../api-reference/api-reference#attemptrefreshingsession)
```js
SuperTokensRequest.attemptRefreshingSession();
```
- Calling this will refresh the current session. It will take care of handling all the token changes.

<div class="divider"></div>

## Example code
```js
import SuperTokensRequest from 'supertokens-website/axios';

SuperTokensRequest.attemptRefreshingSession().then(success => {
    if (success) {
        // session refreshed!
    } else {
        // session has expired - please redirect to login page.
    }
}).catch(err => {
    if (err.response !== undefined && err.response.status === 500) {
        // server error
    } else {
        // handle more errors.
        // status will never be equal to session expired since in that case, this function will return false.
    }
});
```