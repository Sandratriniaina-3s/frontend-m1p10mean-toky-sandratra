import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { TokenService } from "src/app/shared/service/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: TokenService,
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
        var isAuthenticated = this.authService.getToken();
        if (!isAuthenticated) {
            this.router.navigate(['/authentication/sign-in']);
        }
        return !!isAuthenticated;
    }
}
