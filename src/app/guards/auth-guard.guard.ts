import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {PasswordManagerService} from "../services/password-manager.service";

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const passwordManager = inject(PasswordManagerService);
  const userState = passwordManager.currentuser();

  if (userState){
    return true;
  }else {
    router.navigateByUrl('/login');
    return false;

  }
};
