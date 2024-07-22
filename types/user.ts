import { User, Follow } from "@prisma/client";

export interface ClerkUser {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
}

export type ProfileUser = User & {
  following: Follow[];
  followedBy: Follow[];
};
