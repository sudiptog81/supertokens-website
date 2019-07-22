---
id: version-3.2.X-non-spa
title: For non-SPA websites
sidebar_label: For non-SPA websites
original_id: non-spa
---

Authentication requires the use of access tokens. When those expire the API should return session expired error after which you should call the refresh token API. 

This is trivial to do for an API call that you make from your frontend code. But when you go to a webpage via your browser's address bar, you do not get to handle the response. This means, you cannot just simply call the refresh token API. Read along to see how to solve this problem.

Let's walk through a NodeJS example for this:
- In your backend code let's say you have a ```GET``` API at ```/home``` like so:
  ```js
    let app = //express app
    app.get("/home", async (req, res) => {
        // Start of /home API logic.
        try {

            // we first verify the session
            let session = await SuperTokens.getSession(req, res, true);

            // session verification successful.
            // we can extract the userId from it.
            let userId = session.getUserId();

            // send an html / js response to the client.
            res.send("<html><body>Welcome user: " + userId + "</body></html>");
        } catch (err) {
            // there was an error while verifying session.
            if (SuperTokens.Error.isErrorFromAuth(err)) {
                if (err.errType === SuperTokens.Error.TRY_REFRESH_TOKEN) {
                    // Here you should not redirect the user to a login page since their session might still be alive. It could just be that their access token has expired.
                    // To handle this, see the next point
                } else {
                    //...
                }
            } else {
                //...
            }
        }
    })
  ```
- If you get a ```TRY_REFRESH_TOKEN``` error, then you could send the following ```HTML / JS``` that would call the refresh session endpoint like so:
  ```html
  <html>
      <body>
          <!-- some pretty UI -->
          <script>
              // load supertokens-website/axios lib as SuperTokensRequest
              SuperTokensRequest.init("/refreshsession", 440);
              SuperTokensRequest.attemptRefreshingSession().then(success => {
                  if (success) {
                      // we have successfully refreshed the session. Now we can reload the home page and it should work!
                      window.location = "/home";
                  } else {
                      // session has expired and the user should login again.
                      window.location = "/login";
                  }
              }).catch(err => {
                  // display some error message and tell user to reload the page.
              });
          </script>
      </body>
  </html>
  ```