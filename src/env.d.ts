interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_SITE_URL: string;

  readonly JWT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type User = {
  id: string;
  studentId: string;
  citizenId: string;
  role: string;
};

declare namespace App {
  interface Locals {
    user: User;
  }
}
