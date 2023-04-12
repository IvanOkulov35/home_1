import {Router} from "express";
import {app} from "../index";
import {videos} from "./router_video";


export  const testRouters = Router({})
testRouters.delete('/', (req,res) => {
    videos.splice(0,videos.length);
    if(videos.length === 0) {
        res.sendStatus(204)
    }
    else {
        res.sendStatus(405)
    }
})