import axios from "axios";

class Helpers {
    static weather = async (country = "Gyumri", code = "am") => {
        const url = `https://api.openweathermap.org/data/2.5/weather?appid=05c171d0664a4c07b782df95a27e61c5&q=${country},${code}`
        const data = await axios.get(url)
        return data.data;
    }
    static randomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    static googleLogin = async (googleToken) => {
        return await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {params: {access_token: googleToken}})
    }
}

export default Helpers
