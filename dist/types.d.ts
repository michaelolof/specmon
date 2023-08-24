type ParamMethod<T, TCconstructor = any> = [
    T
] extends [((...args: any) => any) | undefined] ? {
    new (): TCconstructor;
    (): T;
    readonly prototype: TCconstructor;
} : never;
type ParamConstructor<T = any> = {
    new (...args: any): T & {};
} | {
    (): T;
} | ParamMethod<T>;
export type ParamType<T> = ParamConstructor<T> | ParamConstructor<T>[];
interface ParamOption<T = any, D = T> {
    type?: ParamType<T> | true | null;
    required?: boolean;
    description?: string;
}
export type Param<T, D = T> = ParamOption<T, D> | ParamType<T>;
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
type InferParamType<T> = [
    T
] extends [null] ? any : [T] extends [{
    type: null | true;
}] ? any : [T] extends [ObjectConstructor | {
    type: ObjectConstructor;
}] ? Record<string, any> : [T] extends [BooleanConstructor | {
    type: BooleanConstructor;
}] ? boolean : [T] extends [DateConstructor | {
    type: DateConstructor;
}] ? Date : [T] extends [(infer U)][] | {
    type: (infer U)[];
} ? U extends DateConstructor ? Date | InferParamType<U> : InferParamType<U> : [T] extends [Param<infer V, infer D>] ? unknown extends V ? IfAny<V, V, D> : V : T;
type OptionalKeys<T> = {
    [K in keyof T]: T[K] extends infer U ? {
        [l in keyof U]: l extends "required" ? U[l] extends false ? K : never : never;
    }[keyof U] : never;
}[keyof T];
type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;
export type ExtractParamTypes<T> = {
    [K in keyof Pick<T, RequiredKeys<T>>]: T[K] extends {
        type_id: "array";
        val: any;
    } ? ExtractParamTypes<T[K]["val"]>[] : T[K] extends {
        type_id: "object";
        val: any;
    } ? ExtractParamTypes<T[K]["val"]> : InferParamType<T[K]>;
} & {
    [K in keyof Pick<T, OptionalKeys<T>>]?: T[K] extends {
        type_id: "array";
        val: any;
    } ? ExtractParamTypes<T[K]["val"]>[] : T[K] extends {
        type_id: "object";
        val: any;
    } ? ExtractParamTypes<T[K]["val"]> : InferParamType<T[K]>;
};
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
        params?: Record<string, ParamOption>;
        cookies?: Record<string, any>;
        headers?: Record<string, any>;
        query?: Record<string, ParamOption>;
        body?: Record<string, ParamOption> | Record<string, ParamOption>[];
    };
    responses?: {
        [code: number]: ResponseSchema;
    };
    tags?: string[];
    summary?: string;
    operationId?: string;
    descriptions?: string;
    produces?: string[];
};
export type HTTPMethods = {
    get?: HTTPMethod;
    post?: HTTPMethod;
    put?: HTTPMethod;
    patch?: HTTPMethod;
    delete?: HTTPMethod;
};
type SpecServers = {
    url?: string;
    description?: string;
    variables?: Record<string, {
        default?: string;
        description?: string;
        enum?: string[];
    }>;
};
export type SpecConfig<Paths, Components> = {
    title: string;
    servers?: SpecServers[];
    paths?: Readonly<Paths>;
    components?: Readonly<Components>;
};
type Option = {
    description?: string;
    required?: boolean;
};
interface NumberType {
    type: ParamType<number>;
}
interface BooleanType extends Option {
    type: ParamType<boolean>;
}
interface StringType {
    type: ParamType<string>;
}
interface NullType {
    type: ParamType<null>;
}
interface LiteralType<T> {
    val: T;
    type: ParamType<T>;
}
interface ArrayType<T> extends Option {
    val: T;
    type: ParamType<T[]>;
    type_id: "array";
}
interface ObjectType<T> extends Option {
    val: T;
    type: ParamType<T>;
    type_id: "object";
}
type StringLiteral<T> = T extends string ? string extends T ? never : T : never;
export declare const types: {
    String<O extends Option>(opt?: O | undefined): StringType & O;
    StringLiteral<O_1 extends Option, T>(opts: O_1 & {
        val: StringLiteral<T>;
    }): LiteralType<T> & O_1;
    Number<O_2 extends Option>(opt?: O_2 | undefined): NumberType & O_2;
    Null<O_3 extends Option>(opt?: O_3 | undefined): NullType & O_3;
    Boolean<O_4 extends Option>(opt?: O_4 | undefined): BooleanType & O_4;
    Array<O_5 extends Option, T_1>(opts: O_5 & {
        val: T_1;
    }): ArrayType<T_1> & O_5;
    Object<O_6 extends Option, T_2>(opts: O_6 & {
        val: T_2;
    }): ObjectType<T_2> & O_6;
};
export {};
