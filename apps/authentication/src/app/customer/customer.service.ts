import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {Auth, google} from 'googleapis';
import {ConfigType} from "@nestjs/config";
import {googleOauthConfig} from "./google-oauth.config";
import {AuthorizationCode} from "./interface/authorization-code.interface";

@Injectable()
export class CustomerService implements OnModuleInit{

  @Inject(googleOauthConfig.KEY) private readonly googleOauthConfig: ConfigType<typeof googleOauthConfig>;

  oauth2Client: Auth.OAuth2Client;

  async getAuthorizationUrl() {

    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'openid'
    ];

    return this.oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'online',
      scope: scopes,
      include_granted_scopes: true,
      state: ''
    })

  }

  async login(query: AuthorizationCode) {
    const {tokens} = await this.oauth2Client.getToken(query.code);
    console.log(CustomerService.decipherToken(tokens.id_token))
  }

  onModuleInit() {
    this.oauth2Client = new google.auth.OAuth2(
      this.googleOauthConfig.client_id,
      this.googleOauthConfig.client_secret,
      this.googleOauthConfig.redirect_uri
    );
  }

  static decipherToken(token: string): {email: string, googleId: string}{
    const rawToken = Buffer.from(token.split('.')[1], 'base64').toString('binary');
    const info = JSON.parse(rawToken)
    return {email: info.email, googleId: info.sub}
  }
}
