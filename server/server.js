const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// const { GraphQLUpload } = require("graphql-upload");
const path = require('path');
const routes = require('./routes')
const cors = require('cors')
// const mongodb = require('mongodb')
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT || 3001;

//note remove or hide this after development

const app = express();
// app.use(`${PORT}/graphql`,GraphQLUpload())
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(), (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();
});

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
})

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
//     app.get("/*", function (req, res) {
//         res.sendFile(path.join(__dirname, "../client/build/index.html"));
//     });
// };

// const startApolloServer = async (typeDefs, resolvers) => {
//     await server.start();
//     server.applyMiddleware({ app });
//     await db.once('open', () => {
//         app.listen(PORT, () => {
//             console.log(`API Server running on port ${PORT}`);
//             console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
//         });
//     });
// };

// startApolloServer(typeDefs, resolvers);
