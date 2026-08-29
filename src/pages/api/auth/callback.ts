import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await response.json();
    const token = data.access_token;

    const script = `
      <script>
        (function() {
          function recieveMessage(e) {
            console.log("recieveMessage %o", e);
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}',
              e.origin
            );
          }
          window.addEventListener("message", recieveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })()
      </script>
    `;

    return new Response(script, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return new Response('Auth Failed', { status: 500 });
  }
};
