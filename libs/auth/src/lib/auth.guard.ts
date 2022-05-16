import { Injectable } from '@nestjs/common';
import { AuthGuard as Auth } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends Auth('custom') {}