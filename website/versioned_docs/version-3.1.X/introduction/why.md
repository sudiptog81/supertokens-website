---
id: version-3.1.X-why
title: Why is a frontend SDK needed?
sidebar_label: Why is this needed
original_id: why
---

- When your access token expires, this library silently and automatically calls your refresh session endpoint saving you development time.
- Manages anti-csrf, access and refresh tokens for you.
- Synchronizes with other requests to the refresh token endpoint as to prevent [this](https://supertokens.io/blog/the-best-way-to-securely-manage-user-sessions#e81c) race condition.
- Provides interceptors for ```fetch``` and ```axios``` so that migration to SuperTokens will be easy.

<div class="specialNote">
You also need to use our backend SDK for a complete solution. Please visit <a target="_blank" href="https://supertokens.io">our home page</a> to find the right one for you.
</div>