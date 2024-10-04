import axios from "axios";

export default axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/ping?x_cg_demo_api_key=CG-xacJq5Vbx4Eswwsc6Re6LCNJ'
})