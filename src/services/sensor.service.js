import axios from "axios";

export const getSensor = (callback) => {
    axios
        .get('https://tesdhtt-default-rtdb.firebaseio.com/.json')
        .then(res => {
            callback(res.data);
        })
        .catch(err => {
            console.error("Error fetching products:", err);
        });
}