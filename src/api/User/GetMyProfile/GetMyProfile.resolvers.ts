import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(async (_: any, __: any, { req }) => {
      const { user } = req;
      return {
        ok: true,
        error: null,
        user
      };
    })
  }
};
export default resolvers;