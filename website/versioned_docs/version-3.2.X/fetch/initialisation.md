---
id: version-3.2.X-initialisation
title: Initialisation & Imports
sidebar_label: Init & Imports
original_id: initialisation
---

## Importing
```js
import SuperTokensRequest from 'supertokens-website';
```

## Call the ```init``` function: [API Reference](../api-reference/api-reference#supertokensfetchinitrefreshtokenurl-sessionexpiredstatuscode-viainterceptor)
```js
SuperTokensRequest.init("https://api.example.com/api/refreshsession", 440, true);
```
- To be called at least once before any http request is made to any of your APIs that require authentication. 
- For example, if your website is a single page ReactJS app, then you can call this in the constructor of the root component.
- <span class="highlighted-text">You only need to call this once in your app.</span>

<div class="divider"></div>

## Example code
```js
// this example is in ReactJS, but something very similar applies to other frameworks as well.
import SuperTokensRequest from 'supertokens-website';
import React from "react";

class RootComponent extends React.Component {
    constructor() {
        SuperTokensRequest.init("https://api.example.com/api/refreshsession", 440, true);
    }

    render() {
        //...
    }
}
```