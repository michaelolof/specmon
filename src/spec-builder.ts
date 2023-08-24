import { type HTTPMethods, type SpecConfig } from "./types";

export function defineSpec<Paths extends Record<string, HTTPMethods>, Components>(config :SpecConfig<Paths, Components>) {
    return config;
}