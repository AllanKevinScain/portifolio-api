import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  //   ssl: false | { rejectUnauthorized: boolean };
}

export default registerAs('database', (): DatabaseConfig => {
  //   const isProd = process.env.NODE_ENV === 'production';

  return {
    type: 'postgres' as const,
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,

    // ssl: isProd
    //   ? {
    //       rejectUnauthorized: false,
    //     }
    //   : false,
  };
});
