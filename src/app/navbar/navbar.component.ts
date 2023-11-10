import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {PasswordManagerService} from "../services/password-manager.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
constructor(private route :Router, private passwordManager : PasswordManagerService) {
}

  onLogout() {
    this.passwordManager.logout().then((res)=>{
      console.log('signOut Done ! '+res);
      this.route.navigateByUrl('/login');
    })
  }
}
