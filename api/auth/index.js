export default async function handler(req, res) {
  const { provider } = req.query;
  const clientId = "Ov23li253ujV6NyQzym4";
  const redirectUri = "https://www.bellanbaby.shop/api/auth/callback"\;

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&redirect_uri=${encodeURIComponent(redirectUri)}`;
  
  res.redirect(302, githubAuthUrl);
}
