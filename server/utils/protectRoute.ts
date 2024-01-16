// import { serverSupabaseUser } from "#supabase/server";

// // If the user does not exist on the request, throw a 401 error
// export default defineEventHandler(async (event) => {
//   const user = await serverSupabaseUser(event);

//   if (!user) {
//     throw createError({
//       message: "Unauthorized",
//       statusCode: 401,
//     });
//   }
// });
