---
id: verifying-session
title: Verifying Session
sidebar_label: Verifying Session
---

This section describes how you can check if a session exists.

## Call the ```sessionPossiblyExists``` function: [API Reference](../api-reference/api-reference#sessionpossiblyexists)
```js
SuperTokensRequest.sessionPossiblyExists();
```
- Returns a ```boolean```
- If ```true```: There may be a session that is active.
- If ```false```: There is definitely no active session. You should ask the user to login.

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

    componenDidMount() {
        if (SuperTokensRequest.sessionPossiblyExists()) {
            // can show user home feed for example.
        } else {
            // can show the login page
        }
    }
}
```