---
id: version-3.2.X-initialisation
title: Initialisation & Imports
sidebar_label: Init & Imports
original_id: initialisation
---

## Importing
```js
import SuperTokensRequest from 'supertokens-website/axios';
```

## Call the ```init``` function: [API Reference](../api-reference/api-reference#supertokensaxiosinitrefreshtokenurl-sessionexpiredstatuscode)
```js
SuperTokensRequest.init("https://api.example.com/api/refreshsession", 440);
```
- To be called at least once before any http request is made to any of your APIs that require authentication. 
- For example, if your website is a single page ReactJS app, then you can call this in the constructor of the root component.
- <span class="highlighted-text">You only need to call this once in your app.</span>

#### Example code
```js
// this example is in ReactJS, but something very similar applies to other frameworks as well.
import SuperTokensRequest from 'supertokens-website/axios';
import React from "react";

class RootComponent extends React.Component {
    constructor() {
        SuperTokensRequest.init("https://api.example.com/api/refreshsession", 440);
    }

    render() {
        //...
    }
}

```

## Call the ```makeSuper``` function: [API Reference](../api-reference/api-reference#supertokensaxiosmakesuperaxios)
```js
SuperTokensRequest.makeSuper(axios);
```
- <span class="highlighted-text">Each time you create a new instance of axios, you need to call ```makeSuper``` with that instance.</span>
- The ```makeSuper``` function allows SuperTokens to intercept your axios calls, so that you do not have to change them. 
- Calling this method is optional. If you choose not to call ```makeSuper``` you will need to manually change all API calls that require authentication to SuperTokens function calls like so:
    - ```axios(url, config) -> SuperTokensRequest.axios(url, config)```
    - ```axios.get(url, config) -> SuperTokensRequest.get(url, config)```
    - ```axios.post(url, data, config) -> SuperTokensRequest.post(url, data, config)```

#### Example code
```js
import SuperTokensRequest from "supertokens-website/axios"
import axios from "axios";  // this creates a new instance of axios
SuperTokensRequest.makeSuper(axios);
```

<div class="specialNote">
Calling makeSuper multiple times is OK
</div>