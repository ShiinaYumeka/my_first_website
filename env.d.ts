/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UAPI_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
