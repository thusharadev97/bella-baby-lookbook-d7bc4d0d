export async function GET() {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const redirectUri = 'https://www.bellanbaby.shop/api/auth/callback'\;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&redirect_uri=${encodeURIComponent(redirectUri)}`;
  return new Response(null, {
    status: 302,
    headers: { Location: url },
  });
}
