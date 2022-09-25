import Helpers from "../services/Helpers";

class UtilsController {
    static weather = async (req, res, next) => {
        try {
            const {country, code} = req.query
            const {name, timezone, temp, coord, main} = await Helpers.weather(country, code)
            const celsius = Math.round(main.temp - 273) + "°C"
            res.json({
                status: 'ok',
                name, timezone, temp, coord, celsius
            })
        } catch (e) {
            next(e)
        }
    }
}
export default  UtilsController
