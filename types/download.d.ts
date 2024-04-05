// TODO: Uncomment after merging Prisma changes
// import type { download_user_details } from "@prisma/client";

// type SessionUserDetails = Omit<
//   download_user_details,
//   "created_at" | "updated_on"
// >;

type SessionUserDetails = {
  id: string;
  affiliation: string | null;
  email: string;
  family_name: string | null;
  given_name: string | null;
  organization: string | null;
  phone: string | null;
};
