import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { koala } from 'koala-utils';
import { KlDelay } from "koala-utils/dist/utils/KlDelay";
import { Router } from "@angular/router";
import { KoalaTokenService } from "../token/koala.token.service";

export interface KoalaOAuth2Config {
  redirectUri: string;
  responseType: string;
  clientId: string;
  scope: string;
  issuer: string;
  redirectUriAfterAuth?: string;
  customQueryParams?: object;
  endpointToken?: string;
  endpointClaims?: string;
}

export interface KoalaOpenIdConfig {
  authorization_endpoint: string;
  check_session_iframe: string;
  claim_types_supported: string[];
  claims_parameter_supported: boolean;
  claims_supported: string[];
  code_challenge_methods_supported: string[];
  end_session_endpoint: string;
  grant_types_supported: string[];
  id_token_encryption_alg_values_supported: string[];
  id_token_encryption_enc_values_supported: string[];
  id_token_signing_alg_values_supported: string[];
  introspection_endpoint: string;
  issuer: string;
  jwks_uri: string;
  registration_endpoint: string;
  request_object_signing_alg_values_supported: string[];
  request_parameter_supported: boolean;
  request_uri_parameter_supported: boolean;
  response_modes_supported: string[];
  response_types_supported: string[];
  scopes_supported: string[];
  subject_types_supported: string[];
  tls_client_certificate_bound_access_tokens: boolean;
  token_endpoint: string;
  token_endpoint_auth_methods_supported: string[];
  token_endpoint_auth_signing_alg_values_supported: string[];
  token_introspection_endpoint: string;
  userinfo_endpoint: string;
  userinfo_signing_alg_values_supported: string[];
}

export type EventType = 'loadedConfig' | 'getToken' | 'getClaims' | 'userAuthenticated' | 'authenticate' | 'logout' | 'errorLoadConfig';

const STATE_STORAGE_NAME = 'koala_openid_state';

@Injectable()
export class KoalaOAuth2Service implements OnDestroy {
  public events = new BehaviorSubject<EventType>(null);
  private config: KoalaOAuth2Config;
  private openIdOptions: KoalaOpenIdConfig;
  private eventSubscription: Subscription;
  private state?: string;
  private token?: any = {};
  private claims?: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: KoalaTokenService
  ) {
    this.generateState();
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  public hasOpenIdConfig() {
    return !!this.openIdOptions;
  }

  public configure(options: KoalaOAuth2Config) {
    this.config = options;
  }

  public loadDiscoveryDocumentAndTryLogin() {

    this.eventSubscription = this.events.subscribe(event => {
      if (event === 'authenticate') {
        this.generateState();
        localStorage.setItem(STATE_STORAGE_NAME, this.state);
        window.location.href = `${this.openIdOptions.authorization_endpoint}?response_type=${this.config.responseType}&client_id=${this.config.clientId}&state=${this.state}&redirect_uri=${this.config.redirectUri}&scope=${this.config.scope}`;
      } else if (event === 'getToken') {
        const urlParams = new URLSearchParams(window.location.search);
        const state = urlParams.get('state');
        if (state === this.state) {
          const code = urlParams.get('code');
          this.getToken(code);
        } else {
          this.logout();
        }
      } else if (event === 'getClaims') {
        this.getClaims();
      }
    });

    return new Promise((resolve, reject) => {
      this.http.get<KoalaOpenIdConfig>(`${this.config.issuer}/.well-known/openid-configuration`).subscribe(options => {
        this.openIdOptions = options;
        if (window.location.href.indexOf(`state=${this.state}`) >= 0) {
          this.events.next('getToken');
        } else if (!this.tokenService.getOAuth2Token()) {
          this.events.next('loadedConfig');
        }
        resolve(true);
      }, e => {
        console.error(e);
        this.events.next('errorLoadConfig');
        reject(e);
      });
    });
  }

  public initLoginFlow() {
    this.events.next('authenticate');
  }

  public getIdentityClaims() {
    return this.claims;
  }

  public getAccessToken() {
    return this.token.access_token;
  }

  public getIdToken() {
    return this.token.id_token;
  }

  public getAccessTokenExpiration() {
    return this.token.expires_in;
  }

  public logout() {
    this.claims = null;
    this.token = null;
    const iframeLogout = document.createElement('iframe');
    iframeLogout.style.display = 'none';
    iframeLogout.src = this.openIdOptions.end_session_endpoint;
    document.querySelector('body').appendChild(iframeLogout);
    this.events.next('logout');
  }

  private getToken(code: string, refreshToken?: string) {
    const formData = new URLSearchParams();
    const data = koala({
      grant_type: (refreshToken ? 'refresh_token' : 'authorization_code'),
      code,
      redirect_uri: this.config.redirectUri,
      client_id: this.config.clientId,
      refresh_token: refreshToken
    }).object().merge(this.config.customQueryParams ?? {}).getValue();

    Object.keys(data).forEach(indexName => {
      formData.append(indexName, data[indexName]);
    });

    this.http.post(this.config.endpointToken ?? this.openIdOptions.token_endpoint, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).subscribe((token: any) => {
      if (!refreshToken) {
        this.getToken(code, token.refresh_token);
      } else {
        this.token = token;
        this.events.next('getClaims');
      }
    }, () => this.events.next('loadedConfig'));
  }

  private getClaims() {
    this.http.get(this.config.endpointClaims ?? this.openIdOptions.userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    }).subscribe(userInfo => {
      this.claims = userInfo;
      this.state = null;
      localStorage.removeItem(STATE_STORAGE_NAME);
      this.events.next('userAuthenticated');
      this.router.navigate([this.config.redirectUriAfterAuth]).then();
    });
  }

  private generateState() {
    this.state = localStorage.getItem(STATE_STORAGE_NAME) ?
                 localStorage.getItem(STATE_STORAGE_NAME) :
                 koala('').string().random(30, true, true, true).getValue();
  }
}
