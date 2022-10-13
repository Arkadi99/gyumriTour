import {Service, Users, Comment, Raiting} from "../models";

(async function main() {

    for (const Model of [Users,
        Service,
        Comment,
        Raiting
    ]){
        await Model.sync({ alter: true, logging: true });
    }
    console.log('done');
    process.exit();
})()

