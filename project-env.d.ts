/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly SITE_URL: string
  }
}
