"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videos = exports.HTTP_STATUS = exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = 3000;
exports.HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQ_400: 400,
    NOT_FOUND_404: 404,
    METHOD_NOT_ALLOWED: 405,
};
exports.videos = [];
const errPost = {
    errorsMessages: []
};
const errPut = {
    errorsMessages: []
};
const arrResolutionVideo = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
exports.app.post('/videos', (req, res) => {
    // res.send(req.body.title)
    const time = new Date();
    let filterPostResolutions = req.body.availableResolutions.filter((p) => arrResolutionVideo.includes(p));
    if ((typeof req.body.title == "string" && typeof req.body.title !== null) && (typeof req.body.author == "string"
        && typeof req.body.author !== null)
        && (req.body.title).length <= 40 && (req.body.author).length <= 20
        && filterPostResolutions.length == (req.body.availableResolutions).length) {
        const newVideo = {
            id: +time,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: time.toISOString(),
            publicationDate: time.toISOString(),
            availableResolutions: req.body.availableResolutions
        };
        exports.videos.push(newVideo);
        if (exports.videos.length > 0) {
            res.status(exports.HTTP_STATUS.CREATED_201).send(newVideo);
        }
        else {
            res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        }
    }
    if (typeof req.body.title !== 'string' || (typeof req.body.title == 'string' && (req.body.title).length > 40)) {
        errPost.errorsMessages.push({ message: "no string or > 40", field: "title" });
    }
    if (typeof req.body.author !== 'string' || (typeof req.body.author == 'string' && (req.body.author).length > 20)) {
        errPost.errorsMessages.push({ message: "no string or > 40", field: "author" });
    }
    if (filterPostResolutions.length !== (req.body.availableResolutions).length) {
        errPost.errorsMessages.push({ message: "incorrect resolution", field: "availableResolutions" });
    }
    if (errPost.errorsMessages.length > 0) {
        res.status(exports.HTTP_STATUS.BAD_REQ_400).send(errPost);
        errPost.errorsMessages.splice(0, errPost.errorsMessages.length);
        return;
    }
});
exports.app.get('/videos', (req, res) => {
    res.status(exports.HTTP_STATUS.OK_200).send(exports.videos);
});
exports.app.get('/videos:id', (req, res) => {
    let videoId = exports.videos.find(p => p.id === +req.params.id);
    if (videoId) {
        res.status(exports.HTTP_STATUS.OK_200).send(videoId);
    }
    else {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
});
exports.app.put('/videos:id', (req, res) => {
    let filterResolutions = req.body.availableResolutions.filter((el) => arrResolutionVideo.includes(el));
    if (typeof req.body.title !== "string" || (req.body.title).length > 40) {
        errPut.errorsMessages.push({ message: "no string or > 40", field: "title" });
    }
    if (typeof req.body.author !== "string" || (req.body.author).length > 20) {
        errPut.errorsMessages.push({ message: "no string or > 40", field: "author" });
    }
    if (filterResolutions.length !== (req.body.availableResolutions).length) {
        errPut.errorsMessages.push({ message: "incorrect resolution", field: "availableResolution" });
    }
    if (typeof req.body.minAgeRestriction !== "number" || req.body.minAgeRestriction < 1 || req.body.minAgeRestriction > 18) {
        errPut.errorsMessages.push({ message: "not number or <1 or > 18", field: "minAgeRestriction" });
    }
    if (typeof req.body.canBeDownloaded !== "boolean") {
        errPut.errorsMessages.push({ message: "must be a true", field: "canBeDownloaded" });
    }
    if (typeof req.body.publicationDate !== "string") {
        errPut.errorsMessages.push({ message: "not string", field: "publicationDate" });
    }
    if (errPut.errorsMessages.length > 0) {
        res.status(exports.HTTP_STATUS.BAD_REQ_400).send(errPut);
        errPut.errorsMessages.splice(0, errPut.errorsMessages.length);
        return;
    }
    let total = 0;
    for (let obj of exports.videos) {
        if (obj.id === +req.params.id) {
            obj.title = req.body.title;
            obj.author = req.body.author;
            obj.availableResolutions = req.body.availableResolutions;
            obj.canBeDownloaded = req.body.canBeDownloaded;
            obj.minAgeRestriction = req.body.minAgeRestriction;
            obj.publicationDate = req.body.publicationDate;
            res.sendStatus(exports.HTTP_STATUS.NO_CONTENT_204);
            total += 1;
            return;
        }
    }
    if (total == 0) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
});
exports.app.delete('/videos:id', (req, res) => {
    let deleteId = exports.videos.filter((elem) => elem.id === +req.params.id);
    if (deleteId.length > 0) {
        exports.videos.splice(exports.videos.indexOf(deleteId[0]), 1);
        res.sendStatus(exports.HTTP_STATUS.NO_CONTENT_204);
        return;
    }
    else {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
});
exports.app.delete('/testing/all-data', (req, res) => {
    exports.videos.splice(0, exports.videos.length);
    if (exports.videos.length === 0) {
        res.sendStatus(exports.HTTP_STATUS.NO_CONTENT_204);
    }
    else {
        res.sendStatus(exports.HTTP_STATUS.METHOD_NOT_ALLOWED);
    }
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
