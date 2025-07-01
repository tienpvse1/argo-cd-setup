import { LoginHandler } from './login.use-case';
import { SignUpHandler } from './sign-up.use-case';
import { UpdateRoleHandler } from './update-role.use-case';

export const AuthUseCases = [SignUpHandler, LoginHandler, UpdateRoleHandler];
