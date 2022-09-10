import { Users } from "../models";

(async function main() {

    for (const Model of [Users]){
        await Model.sync({ alter: true, logging: true });
    }
    console.log('done');
    process.exit();
})()

