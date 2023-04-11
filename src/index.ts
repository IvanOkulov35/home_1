
import express from 'express'
import {videosRouter} from "./routers/router_video";
import {testRouters} from "./routers/test_routers";

export const app = express()
const port = 3000




app.use('/videos', videosRouter)
app.use('/testing', testRouters)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})