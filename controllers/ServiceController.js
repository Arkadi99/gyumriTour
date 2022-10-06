import { Service } from "../models";
import sharp  from 'sharp';
import path from "path";
import fs from 'fs';

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
}

export default ServiceController;