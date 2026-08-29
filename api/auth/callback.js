export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = "Ov23li253ujV6NyQzym4";
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    const data = await response.json();
    const token = data.access_token;

    const content = `
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage %o", e);
          }
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({ token: token, provider: "github" })}',
            "https://www.bellanbaby.shop"
          );
        })()
      </script>
    `;

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(content);
  } catch (error) {
    res.status(500).send("Authentication failed");
  }
}
