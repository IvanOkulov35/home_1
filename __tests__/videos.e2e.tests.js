"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../src");
const src_2 = require("../src");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(src_1.app)
        .delete("/videos");
}));
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
};
describe("POST /videos", () => {
    it("should create new video", () => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield (0, supertest_1.default)(src_1.app).post('/videos').send(video_POST);
        expect(post.status).toBe(src_2.HTTP_STATUS.CREATED_201);
    }));
    it("should post", () => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, supertest_1.default)(src_1.app)
            .post('/videos')
            .send(video_POST)
            .expect(src_2.HTTP_STATUS.CREATED_201);
    }));
    it("should delete videos", () => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, supertest_1.default)(src_1.app)
            .delete('/videos')
            .expect(src_2.HTTP_STATUS.OK_200);
    }));
});
