import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {NavController} from "@ionic/angular";

class Router {
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // region Atributos
  public JWToken = 'TK1983!';
  public profileToken = 'PF849!';
  public permissionToken = 'PSK2358!';

  public role;
  public dashURL: string;
  public profile: any;
  public globalURL = environment.globalUrl;


  // endregion

  // region Constructor
  constructor(
    public httpClient: HttpClient,
    public navCtrl: NavController
  ) {
    this.dashURL = environment.dashUrl;
  }
  // endregion

  // region Métodos

  // Obtiene el token guardado en sessionStorage, si no existe devuelve null
  getToken() {
    const token = sessionStorage.getItem(this.JWToken);
    if (token != 'undefined') {
      return token;
    } else {
      return null;
    }
  }

  // Obtiene el array de acciones por modulo del usuario
  // getActionsModule(): Permission[] {
  //   const permissions = JSON.parse(atob(sessionStorage.getItem(this.permissionToken)));
  //   if (permissions || permissions.length > 0) {
  //     for (let i = 0; i < permissions.length; i++) {
  //       permissions[i].name = TxtConv.txtCon(permissions[i].name, 'uppercase');
  //       permissions[i].module = TxtConv.txtCon(permissions[i].module, 'uppercase');
  //     }
  //     return permissions as Permission[];
  //   } else {
  //     return null;
  //   }
  // }

  // Verifica si la acción o acciones se encuentran dentro del perfil del uuario
  // verifyActions(checkActions: [any]): boolean {
  //   const actions = JSON.parse(atob(sessionStorage.getItem(this.permissionToken)));
  //   if (actions || actions.length > 0) {
  //     for (let i = 0; i < checkActions.length; i++) {
  //       for (let j = 0; j < actions.length; j++) {
  //         actions[j].name = TxtConv.txtCon(actions[j].name, 'uppercase');
  //         actions[j].module = TxtConv.txtCon(actions[j].module, 'uppercase');
  //         if (actions[j].name === checkActions[i]) {
  //           return true;
  //         }
  //       }
  //     }
  //   } else {
  //     return false;
  //   }
  // }

  // Obtiene el objeto de tipo user que esta guardado en sessionStorage
  // getProfile(): Profile {
  //   if (sessionStorage.getItem(this.profileToken)) {
  //     const profile = JSON.parse(atob(sessionStorage.getItem(this.profileToken)));
  //     if (profile) {
  //       return profile.profile as Profile;
  //     } else {
  //       return null;
  //     }
  //   } else {
  //     return null;
  //   }
  // }


  // Obtiene el rol almacenado en sessionStorage, si no existe devuleve null
  public getRole(): string {
    const role = sessionStorage.getItem(JSON.parse(this.profileToken).role);
    if (role != 'undefined') {
      return  role;
    } else {
      return null;
    }
  }

  // Función para enviar las credendiales de autenticación con el backend
  signup(data): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.dashURL + '/login', data, {headers: headers});
  }

  // función amigable para verificar si existe el token de sesión
  public isLogged(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  // Función para cerrar sesión, elimina lo almacenado en sessionStorage
  logout() {
    sessionStorage.removeItem(this.JWToken);
    sessionStorage.removeItem(this.profileToken);
    sessionStorage.removeItem(this.permissionToken);
    // Redireccionar
    this.navCtrl.navigateRoot(['/login']);
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  recoveryPws(data): Observable<any> {
    return this.httpClient.post<any>(`${this.globalURL}/recovery-psw`, data).pipe(map(response => {
      return response;
    }))
  }

  verifyRecTK(data): Observable<any> {
    return this.httpClient.post<any>(`${this.globalURL}/review-recovery-token`, data).pipe(map(response => {
      return response;
    }))
  }

  changePasswordRecTK(data): Observable<any> {
    return this.httpClient.post<any>(`${this.globalURL}/change-pwd-token`, data).pipe(map(response => {
      return response;
    }))
  }

  activateUserRecTK(data): Observable<any> {
    return this.httpClient.post<any>(`${this.globalURL}/activate-usr-token`, data).pipe(map(response => {
      return response;
    }))
  }

  // endregion
}
