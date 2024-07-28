type GoogleAuthOptions = {
  redirect_uri: string;
  client_id: string;
  access_type: "offline";
  response_type: "code";
  prompt: "consent";
  scope: string;
};

export const getGoogleUrl = (): string => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  // Define the options for the Google OAuth URL
  const options: GoogleAuthOptions = {
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI as string,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  // Query string - create a new URLSearchParams object and append the options
  const qs = new URLSearchParams(options);

  // Return the URL with the query string
  return `${rootUrl}?${qs.toString()}`;
};
