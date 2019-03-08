import User from "../../../entities/User";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import cleanNullArgs from "../../../utils/cleanNullArg";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNull: any = cleanNullArgs(args); 
        if (notNull.password !== null) {
          user.password = notNull.password; 
          user.save(); //저장을 해 줘야 user instant가 생성되어 BeforeUpdate함수가 실행된다.
          delete notNull.password; 
        }
        try {
          await User.update({ id: user.id }, { ...notNull }); //user.save() 없이 update를 하면 BeforeUpdate가 실행되지 않으며, id가 없어도 에러가 출력되지 않는다.
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
