import { NextFunction, Express, Request, Response } from "express";
import { Router } from "express";


type ParamMethod<T, TCconstructor = any> = 
    [T] extends [((...args: any) => any) | undefined]
    ? { new(): TCconstructor; (): T; readonly prototype: TCconstructor; }
    : never;

type ParamConstructor<T = any> = 
    { new (...args :any): T & {}; } |
    { (): T } |
    ParamMethod<T> 

export type ParamType<T> = ParamConstructor<T> | ParamConstructor<T>[];

interface ParamOption<T = any, D = T> {
    type?: ParamType<T> | true | null;
    required?: boolean;
    // default?: D | null | undefined | object
    description?: string
}

export type Param<T, D = T> = ParamOption<T, D> | ParamType<T>;

export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;


type InferParamType<T> = 
    [T] extends [null] 
    ? any 
    : [T] extends [{ type: null | true }]
        ? any 
        : [T] extends [ObjectConstructor | { type: ObjectConstructor }]
            ? Record<string, any> 
            : [T] extends [BooleanConstructor | { type: BooleanConstructor }]
                ? boolean
                : [T] extends [DateConstructor | { type: DateConstructor }]
                    ? Date 
                    : [T] extends [(infer U)][] | { type: (infer U)[]; }
                        ? U extends DateConstructor 
                        ? Date | InferParamType<U> 
                        : InferParamType<U> 
                        : [T] extends [Param<infer V, infer D>] ? unknown extends V ? IfAny<V, V, D> : V : T; 



type OptionalKeys<T> = {
    [K in keyof T]: T[K] extends infer U
        ? { 
            [l in keyof U]: l extends "required" 
            ? U[l] extends false
                ? K
                : never
            : never  
        }[keyof U]
        : never 
}[keyof T]

type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;

// export type ExtractParamTypes<O> = 
//     { [K in keyof Pick<O, RequiredKeys<O>>]: InferParamType<O[K]> } &
//     { [K in keyof Pick<O, OptionalKeys<O>>]?: InferParamType<O[K]> };

export type ExtractParamTypes<T> = {
    [K in keyof Pick<T, RequiredKeys<T>>]: T[K] extends { type_id: "array", val: any } 
        ?  ExtractParamTypes<T[K]["val"]>[]
        :  T[K] extends { type_id: "object", val: any } 
            ? ExtractParamTypes<T[K]["val"]>
            : InferParamType<T[K]>
} & {
    [K in keyof Pick<T, OptionalKeys<T>>]?: T[K] extends { type_id: "array", val: any } 
        ?  ExtractParamTypes<T[K]["val"]>[]
        :  T[K] extends { type_id: "object", val: any } 
            ? ExtractParamTypes<T[K]["val"]>
            : InferParamType<T[K]>
};
    
// -----------------------------------------------------------------------------
type ResponseSchema = {
    description?: string;
    content?: string;
    statusText?: string;
    headers?: Record<string, any>;
    cookies?: Record<string, any>;
    body?: unknown;
};

type HTTPMethod = {
    request?: {
        params?: Record<string, ParamOption>
        cookies?: Record<string, any>
        headers?: Record<string, any>
        query?: Record<string, ParamOption>
        body?: Record<string, ParamOption> | Record<string, ParamOption>[]
    },

    responses?: {
        [code :number]: ResponseSchema
    }

    tags?: string[]
    summary?: string;
    operationId?: string;
    descriptions?: string;
    produces?: string[]
}

export type HTTPMethods = {
    get?: HTTPMethod;
    post?: HTTPMethod;
    put?: HTTPMethod;
    patch?: HTTPMethod;
    delete?: HTTPMethod;
}

type SpecServers = {
    url?: string;
    description?: string;
    variables?: Record<string, { default?: string, description?: string, enum?: string[] }>
}

export type SpecConfig<Paths, Components> = {
    title: string;
    servers?: SpecServers[];
    paths?: Readonly<Paths>;
    components?: Readonly<Components>
}


// ------------------------------------------------
type Option = {
    description?: string,
    required?: boolean;
}

interface NumberType {
    type: ParamType<number> 
}

interface BooleanType extends Option {
    type: ParamType<boolean> 
}

interface StringType {
    type: ParamType<string> 
}

interface NullType {
    type: ParamType<null>
}

interface LiteralType<T> {
    val: T,
    type: ParamType<T>
}

interface ArrayType<T> extends Option {
    val: T,
    type: ParamType<T[]>
    type_id: "array"
}

interface ObjectType<T> extends Option {
    val: T,
    type: ParamType<T>
    type_id: "object"
}

type StringLiteral<T> = T extends string 
    ? string extends T 
        ? never 
        : T 
    : never;

export const types = {

    String<O extends Option>(opt?: O): StringType & O {
        return {
            ...(opt || {}) as any,
            type: String,
        };
    },

    StringLiteral<O extends Option, T>(opts: O & { val: StringLiteral<T> }) :LiteralType<T> & O {
        return {
            ...opts,
            type: Symbol("literal") as any,
        };
    },
    
    Number<O extends Option>(opt?: O) :NumberType & O {
        return {
            ...(opt || {}) as any,
            type: Number,
        };
    },

    Null<O extends Option>(opt?: O) :NullType & O {
        return {
            ...(opt || {}) as any,
            type: null,
        };
    },

    Boolean<O extends Option>(opt?: O) :BooleanType & O {
        return {
            ...(opt || {}) as any,
            type: Boolean,
        };
    },

    Array<O extends Option, T>(opts: O & { val: T }): ArrayType<T> & O {
        return {
            ...opts,
            type: Array,
            type_id: "array",
        };
    },

    Object<O extends Option, T>(opts: O & { val: T }): ObjectType<T> & O {
        return {
            ...opts,
            type: Object,
            type_id: "object",
        };
    },

};


const UserFlows = {
    id: types.String(),
    title: types.String(),
    description: types.String({ required: false }),
    total_steps: types.Number(),
    created_at: types.String(), 
};

const ChildObj = {
    title: types.String(),
    description: types.String({ required: false }),
};

const testBody = {
    status: types.StringLiteral({ val: "success" }),
    message: types.String(),
    data: types.Array({ val: UserFlows }),
    danger: types.Object({ val: ChildObj }),
};

type TestBody = typeof testBody;


type TestedBody = ExtractParamTypes<TestBody>;

const testedBody = {} as TestedBody;
// testedBody.data[0].