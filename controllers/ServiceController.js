import { Service } from "../models";
import sharp  from 'sharp';
import path from "path";
import HttpError from "http-errors";

class ServiceController {
    static createService = async(req, res, next) => {
        try {
            const {userId} = req;
            const {name, location, description, address, type} = req.body;
            const {files} = req;

            const fileNames = files.map(file => file.filename)

            if (files){
               files.map(async (file) => (
                   await sharp(file.path)
                       .rotate()
                       .resize(512)
                       .toFile(path.join(__dirname, '../public', file.filename))
                ))
            }

            const point = {type: 'Point', coordinates: location.split(',')}
            const service = await Service.create({
                name,
                location: point,
                description,
                type,
                address,
                images: fileNames,
                userId
            })

            res.json({
                service
            })
        } catch (e) {
            next(e)
        }
    }
    static getOneService = async (req, res, next) => {
        try {
            const serviceId = req.params.id;

            const service = await Service.findOne({
                where: {
                    id: serviceId
                }
            });

            if(!service) {
                 next(HttpError(403, "Service not found!!!"));
            }

            res.json({
                service
            })
        } catch (e) {
            next(e)
        }
    }
    static getAllServices = async (req, res, next) => {
        try {
            const {type, s} = req.query

            let services

            if (type || s) {
                services = await Service.findAll({
                    where: {
                        $or: [
                            {name: {$like: `%${s}%`}},
                            {type: { $or: [{$like: `%${s}%`}, {$like: type}] }},
                            {description: {$like: `%${s}%`}},
                            {address: {$like: `%${s}%`}}
                        ]
                    }
                })
            } else {
                services = await Service.findAll()
            }

            res.json({
              services
            })
        } catch (e) {
            next(e)
        }
    }
    static deleteService = async (req, res, next) => {
        try {
            const {userId} = req;
            const {id} = req.params;

            const service = await Service.destroy({
                where: {
                   $and: [
                       {id},
                       {userId}
                   ]
                }
            })

            if(!service) {
                next(HttpError(401, 'something went wrong, you can\'t delete this data!!!'))
            }

            res.json({
                status: 'ok',

            })
        } catch (e) {
            next(e)
        }
    }
    static updateService = async (req, res, next) => {
        try {
            const {userId, files} = req;
            const {id} = req.params;
            const {name, location, description, address, type} = req.body;

            const service = await Service.findOne({
                where : {
                    $and: [
                        {id},
                        {userId}
                    ]
                }
            });

            const fileNames = files.map(file => file.filename)

            if (files){
                files.map(async (file) => (
                    await sharp(file.path)
                        .rotate()
                        .resize(512)
                        .toFile(path.join(__dirname, '../public', file.filename))
                ))
            }
            const point = {type: 'Point', coordinates: location.split(',')}
            if(service){
                service.set({
                    name,
                    location: point,
                    description,
                    type,
                    address,
                    images: fileNames
                })

                await service.save();
            }

            res.json({
                status: 'ok'
            })
        } catch (e) {
            next(e)
        }
    }
}

export default ServiceController;