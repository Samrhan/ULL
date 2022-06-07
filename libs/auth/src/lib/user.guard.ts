import {
    CanActivate,
    ExecutionContext,
    InternalServerErrorException,
    mixin,
    UnauthorizedException
} from "@nestjs/common";

export const UserGuard = (role: string) => {
    class UserGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest()
            if(!request.user) {
                throw new InternalServerErrorException('Must use auth guard on this route before the user guard')
            }

            if (request.user.userType !== role)
                throw new UnauthorizedException('Cannot access this resource')
            return true
        }
    }

    return mixin(UserGuardMixin) as never;
}