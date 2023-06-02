const uuid = require("uuid");
const Posts = require("../models/posts.model");

const data = [];

for (let i = 1; i <= 20; i++) {
    data.push({
        id: uuid.v4(),
        content: `Esta es la publicacion ${i} de Brayan`,
        userId: "0120e619-3901-440b-a4f9-1e1424fc7e9d",
    });

    data.push({
        id: uuid.v4(),
        content: `Esta es la publicacion ${i} de Stiven`,
        userId: "60852707-7741-4492-b34a-14c25b01af9b",
    });

    data.push({
        id: uuid.v4(),
        content: `Esta es la publicacion ${i} de Estefania`,
        userId: "093f85e8-1e84-4e06-967b-714be18ec5b3",
    });

    data.push({
        id: uuid.v4(),
        content: `Esta es la publicacion ${i} de Pablo`,
        userId: "89c7c7f5-f279-4946-ba79-3dd04f819663",
    });

    data.push({
        id: uuid.v4(),
        content: `Esta es la publicacion ${i} de Camilo`,
        userId: "7a9e8130-1623-40ba-9f41-edf0d4ad2c75",
    });

    data.push({
        id: uuid.v4(),
        content: `Esta es la publicacion ${i} de Osmar`,
        userId: "13b4db9c-3f8d-49ed-b77d-b26743c42053",
    });
}

const generatePostsSeed = async () => {
    await Posts.bulkCreate(data);
};

generatePostsSeed()
    .then(() => console.log("User seeders executed succesfully!"))
    .catch((err) => console.log(err));
