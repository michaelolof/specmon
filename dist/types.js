"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = {
    String(opt) {
        return Object.assign(Object.assign({}, (opt || {})), { type: String });
    },
    StringLiteral(opts) {
        return Object.assign(Object.assign({}, opts), { type: Symbol("literal") });
    },
    Number(opt) {
        return Object.assign(Object.assign({}, (opt || {})), { type: Number });
    },
    Null(opt) {
        return Object.assign(Object.assign({}, (opt || {})), { type: null });
    },
    Boolean(opt) {
        return Object.assign(Object.assign({}, (opt || {})), { type: Boolean });
    },
    Array(opts) {
        return Object.assign(Object.assign({}, opts), { type: Array, type_id: "array" });
    },
    Object(opts) {
        return Object.assign(Object.assign({}, opts), { type: Object, type_id: "object" });
    },
};
const UserFlows = {
    id: exports.types.String(),
    title: exports.types.String(),
    description: exports.types.String({ required: false }),
    total_steps: exports.types.Number(),
    created_at: exports.types.String(),
};
const ChildObj = {
    title: exports.types.String(),
    description: exports.types.String({ required: false }),
};
const testBody = {
    status: exports.types.StringLiteral({ val: "success" }),
    message: exports.types.String(),
    data: exports.types.Array({ val: UserFlows }),
    danger: exports.types.Object({ val: ChildObj }),
};
const testedBody = {};
// testedBody.data[0].
