import {Service, Users} from "../models";

(async function main() {

    for (const Model of [Users,
        Service
    ]){
        await Model.sync({ alter: true, logging: true });
    }
    console.log('done');
    process.exit();
})()

