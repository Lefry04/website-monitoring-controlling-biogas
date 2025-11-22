import axios from "axios";

export const getSensorAliran = (callback) => {
    axios
        .get('https://tesdhtt-default-rtdb.firebaseio.com/aliran.json')
        .then(res => {
            callback(res.data);
        })
        .catch(err => {
            console.error("Error fetching products:", err);
        });
}