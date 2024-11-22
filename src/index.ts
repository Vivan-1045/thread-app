import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function Server() {
  const app = express();
  const PORT = Number(process.env.PORT) || 404;
                                                              
  app.use(express.json()) 

   
  app.get("/", (req, res) => {
    res.json({ message: "server is up and started" });                                                                    
  });

  //gql server
  const gqlServer = new ApolloServer({
    typeDefs: `
       type Query {
          hello : String
          say(name: String) : String
       }
    `,
    resolvers: {
        Query :{
            hello : ()=>`Hii I am graphql server`,
            say : (_,{name}:{name: String}) => `Hey ${name}, how are you `
        },
    },
  });

  //Start gql server
  await gqlServer.start();
  app.use("/graphql",expressMiddleware(gqlServer))

  app.listen(PORT, () => console.log(`Server is Started at PORT: ${PORT}`));
}
Server();
