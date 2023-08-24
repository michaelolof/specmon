"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createService = void 0;
const express_1 = __importDefault(require("express"));
// @ts-ignore
if (!express_1.default.response.sendWithStatus) {
    // @ts-ignore
    express_1.default.response.sendWithStatus = function (code, body) {
        return this.status(code).send(body);
    };
}
const createService = (router, spec) => {
    function route(url, methods) {
        if (methods.get) {
            router.get(url, methods.get);
        }
        if (methods.post) {
            router.post(url, methods.post);
        }
        if (methods.put) {
            router.put(url, methods.put);
        }
        if (methods.patch) {
            router.patch(url, methods.patch);
        }
        if (methods.delete) {
            router.delete(url, methods.delete);
        }
    }
    return {
        router,
        route,
        spec,
    };
};
exports.createService = createService;
