import request from 'supertest'
import {app} from "../src";
import {HTTP_STATUS} from "../src";
import {response} from "express";
beforeAll(async() => {
    await request(app)
        .delete("/videos")
} )
const video_POST = {
    "id": 123,
    "title": "123",
    "author": "null",
    "canBeDownloaded": true,
    "minAgeRestriction": 15,
    "createdAt": "2023-03-14T13:32:54.407Z",
    "publicationDate": "2023-03-14T13:32:54.407Z",
    "availableResolutions": [
        "P144"
    ]
}

describe ("POST /videos", () => {
    it("should create new video", async () => {
        const post = await request(app).post('/videos').send(video_POST);
        expect(post.status).toBe(HTTP_STATUS.CREATED_201)
    })


    it("should post", async () =>
        await request(app)
            .post('/videos')
            .send(video_POST)
            .expect(HTTP_STATUS.CREATED_201))

    it ("should delete videos", async () =>
        await request(app)
            .delete('/videos')
            .expect(HTTP_STATUS.OK_200))})