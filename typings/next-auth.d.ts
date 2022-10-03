/**
 * next-auth.d.ts
 * @author soltia48
 * @date 2021-07-25
 */

import "next-auth";

import { UserEntity } from "../types/UserEntity";

declare module "next-auth" {
  interface Session {
    user: UserEntity;
  }
}
