import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",
      userinfo: 'https://api.twitter.com/2/users/me?user.fields=id,username,profile_image_url',
      profile(profile) {
        return {
          id: profile.data.id,
          // use username instead of name
          name: profile.data.username,
          image: profile.data.profile_image_url,
        }
      },
      

    }),
  ],

};
export default NextAuth(authOptions);