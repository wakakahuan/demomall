import { request } from "./reuqest.js";

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}