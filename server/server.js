const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// const mongodb = require('mongodb')
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
};

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });
    await db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API Server running on port ${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
        });
    });
};

startApolloServer(typeDefs, resolvers);
