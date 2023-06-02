require("dotenv").config();

console.log(`\n${process.env.JWT_SECRETE}\n`);
console.log(`\n${process.env.HOST}\n`);
console.log(`\n${process.env.NODE_ENV}\n`);
console.log(`\n${process.env.JWT_SECRETE}\n`);

const config = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRETE,
    DB: {
        dev: {
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
        prod: {
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
