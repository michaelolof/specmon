import { Router, NextFunction, Request, Response } from "express";
import express from "express";
import { type SpecConfig, ExtractParamTypes } from "./types";

// @ts-ignore
if (!express.response.sendWithStatus) {
    // @ts-ignore
    express.response.sendWithStatus = function(this: typeof express.response, code :number, body :any) {
        return this.status(code).send(body);
    };
}


export const createService = <Paths, Components>(router :Router, spec: SpecConfig<Paths, Components>) => {

    function route<U extends keyof Paths, MO = Paths[U]>(
        url: U, 
        methods :{ 
            get?: (
                // @ts-ignore
                req: Request<ExtractParamTypes<MO["get"]["request"]["params"]>, ExtractParamTypes<MO["get"]["responses"][200]["body"]>, ExtractParamTypes<MO["get"]["request"]["body"]>, ExtractParamTypes<MO["get"]["request"]["query"]>>,
                // @ts-ignore
                res: Response<ExtractParamTypes<MO["get"]["responses"][200]["body"]>> & { sendWithStatus: <C extends keyof MO["get"]["responses"]>(code: C, body: ExtractParamTypes<MO["get"]["responses"][C]["body"]>) => any },
                next?: NextFunction
            ) => Response

            post?: (
                // @ts-ignore
                req: Request<MO["post"]["params"], MO["post"]["responses"][200], MO["post"]["body"], MO["post"]["query"]>,
                // @ts-ignore
                res: Response<MO["post"]["responses"][200]> & { sendWithStatus: <C extends keyof MO["post"]["responses"]>(code: C, body: MO["post"]["responses"][C]) => any },
                next?: NextFunction
            ) => Response

            put?: (
                // @ts-ignore
                req: Request<MO["put"]["params"], MO["put"]["responses"][200], MO["put"]["body"], MO["put"]["query"]>,
                // @ts-ignore
                res: Response<MO["put"]["responses"][200]> & { sendWithStatus: <C extends keyof MO["put"]["responses"]>(code: C, body: MO["put"]["responses"][C]) => any },
                next?: NextFunction
            ) => Response

            patch?: (
                // @ts-ignore
                req: Request<MO["patch"]["params"], MO["patch"]["responses"][200], MO["patch"]["body"], MO["patch"]["query"]>,
                // @ts-ignore
                res: Response<MO["patch"]["responses"][200]> & { sendWithStatus: <C extends keyof MO["patch"]["responses"]>(code: C, body: MO["patch"]["responses"][C]) => any },
                next?: NextFunction
            ) => Response

            delete?: (
                // @ts-ignore
                req: Request<MO["delete"]["params"], MO["delete"]["responses"][200], MO["delete"]["body"], MO["delete"]["query"]>,
                // @ts-ignore
                res: Response<MO["delete"]["responses"][200]> & { sendWithStatus: <C extends keyof MO["delete"]["responses"]>(code: C, body: MO["delete"]["responses"][C]) => any },
                next?: NextFunction
            ) => Response
            
        },
    ) {
        if (methods.get) {
            router.get(url as string, methods.get as any);
        }

        if (methods.post) {
            router.post(url as string, methods.post as any);
        }

        if (methods.put) {
            router.put(url as string, methods.put as any);
        }

        if (methods.patch) {
            router.patch(url as string, methods.patch as any);
        }

        if (methods.delete) {
            router.delete(url as string, methods.delete as any);
        }
    }

    return {
        router,
        route,
        spec,
    };
};