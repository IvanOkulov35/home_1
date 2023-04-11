import {Router} from "express";
import {app} from "../index";
import {videos} from "./router_video";
import {HTTP_STATUS} from "./router_video";

export  const testRouters = Router({})
testRouters.delete('/all-data', (req,res) => {
    videos.splice(0,videos.length);
    if(videos.length === 0) {
        res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
    }
    else {
        res.sendStatus(HTTP_STATUS.METHOD_NOT_ALLOWED)
    }
})