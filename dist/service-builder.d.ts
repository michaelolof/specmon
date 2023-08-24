import { Router, NextFunction, Request, Response } from "express";
import { type SpecConfig, ExtractParamTypes } from "./types";
export declare const createService: <Paths, Components>(router: Router, spec: SpecConfig<Paths, Components>) => {
    router: Router;
    route: <U extends keyof Paths, MO = Paths[U]>(url: U, methods: {
        get?: ((req: Request<ExtractParamTypes<MO["get"]["request"]["params"]>, ExtractParamTypes<MO["get"]["responses"][200]["body"]>, ExtractParamTypes<MO["get"]["request"]["body"]>, ExtractParamTypes<MO["get"]["request"]["query"]>, Record<string, any>>, res: Response<ExtractParamTypes<MO["get"]["responses"][200]["body"]>, Record<string, any>> & {
            sendWithStatus: <C extends keyof MO["get"]["responses"]>(code: C, body: ExtractParamTypes<MO["get"]["responses"][C]["body"]>) => any;
        }, next?: NextFunction) => Response) | undefined;
        post?: ((req: Request<MO["post"]["params"], MO["post"]["responses"][200], MO["post"]["body"], MO["post"]["query"], Record<string, any>>, res: Response<MO["post"]["responses"][200], Record<string, any>> & {
            sendWithStatus: <C_1 extends keyof MO["post"]["responses"]>(code: C_1, body: MO["post"]["responses"][C_1]) => any;
        }, next?: NextFunction) => Response) | undefined;
        put?: ((req: Request<MO["put"]["params"], MO["put"]["responses"][200], MO["put"]["body"], MO["put"]["query"], Record<string, any>>, res: Response<MO["put"]["responses"][200], Record<string, any>> & {
            sendWithStatus: <C_2 extends keyof MO["put"]["responses"]>(code: C_2, body: MO["put"]["responses"][C_2]) => any;
        }, next?: NextFunction) => Response) | undefined;
        patch?: ((req: Request<MO["patch"]["params"], MO["patch"]["responses"][200], MO["patch"]["body"], MO["patch"]["query"], Record<string, any>>, res: Response<MO["patch"]["responses"][200], Record<string, any>> & {
            sendWithStatus: <C_3 extends keyof MO["patch"]["responses"]>(code: C_3, body: MO["patch"]["responses"][C_3]) => any;
        }, next?: NextFunction) => Response) | undefined;
        delete?: ((req: Request<MO["delete"]["params"], MO["delete"]["responses"][200], MO["delete"]["body"], MO["delete"]["query"], Record<string, any>>, res: Response<MO["delete"]["responses"][200], Record<string, any>> & {
            sendWithStatus: <C_4 extends keyof MO["delete"]["responses"]>(code: C_4, body: MO["delete"]["responses"][C_4]) => any;
        }, next?: NextFunction) => Response) | undefined;
    }) => void;
    spec: SpecConfig<Paths, Components>;
};
