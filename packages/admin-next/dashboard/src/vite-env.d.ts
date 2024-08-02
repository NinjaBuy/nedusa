// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NINJA_ADMIN_BACKEND_URL: string
  readonly VITE_NINJA_V2: "true" | "false"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
