import { type HTTPMethods, type SpecConfig } from "./types";
export declare function defineSpec<Paths extends Record<string, HTTPMethods>, Components>(config: SpecConfig<Paths, Components>): SpecConfig<Paths, Components>;
