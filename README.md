Project combining a couple pieces of tech I like

Next.JS
NextAuth for authentication
Apollo for Graphql server/operations/definitions
* Also used for managing local state
Prisma for database queries and connection

Thoughts
Not a bad idea for creating a web app quickly. Love next.js obviously. NextAuth is an amazing project for making authentication braindead easy. The issue of having no option with passwords can be limiting but tbh not a big deal. It's surprising though there wasn't anything clear on how to link user information to other tables, because injecting the user object with the userId seemed a bit jank. Apollo was fine from a backend perspective, but it has to be cut up strangely between queries, definitions, and schema. I also didn't like apollo's inability to manage local state well. Managing the cache is too slow the "right" way by updating the cache in the graphql operation's update function. [This](https://github.com/apollographql/ac3-state-management-examples) github repo was helpful in showing the different ways graphql can manage local state, as well as the (apollo docs)[https://www.apollographql.com/docs/react/local-state/local-state-management/]. You could likely wang-jangle something using the local state variables instead of the cache, but the fact you have to do that is evidence it isn't that good. Prisma was good, and having the typescript types is nice. Couple issues came up. I wish I could use prisma types for mygraphql, or at least connect the two more closely. Second, Prisma has a couple flaws in its db queries such as not supporting nested aggregation (or much of any aggregation at all for that matter) and not supporting cascading deletes for non-null relations. Still a big fan of the community though! Overall, fun project to showcase how far the js ecosystem has come.

npm i && npm run dev