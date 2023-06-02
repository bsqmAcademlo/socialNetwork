require("dotenv").config();

const config = {
    PORT: process.env.PORT || 3002,
    HOST: process.env.HOST || "http://localhost:3002",
    NODE_ENV: process.env.NODE_ENV || "dev",
    jwtSecret: process.env.JWT_SECRETE,
    DB: {
        dev: {
            dialect: process.env.DB_DIALECT || "postgres",
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT || 5432,
            username: process.env.DB_USERNAME || "postgres",
            password: process.env.DB_PASSWORD || "root",
            database: process.env.DB_DATABASE || "redsocial",
            //Extra configs
            define: {
                timestamps: true,
                underscored: true,
            },
        },
        prod: {
            dialect: process.env.DB_DIALECT || "postgres",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            //Extra configs
            define: {
                timestamps: true,
                underscored: true,
            },
            // config production
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        },
        test: {
            dialect: process.env.DB_DIALECT,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            //Extra configs
            define: {
                timestamps: true,
                underscored: true,
            },
        },
    },
};

module.exports = config;
