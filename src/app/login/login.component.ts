import {Component, OnInit} from '@angular/core';
import {PasswordManagerService} from "../services/password-manager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
constructor(private passwordManager : PasswordManagerService , private route : Router) {
}
  onSubmit(value: any) {
    //console.log(value);
    this.passwordManager.login(value.email,value.password).then((res)=>{
      console.log("Login Success ! " +res);
      this.route.navigateByUrl('/site-list');
    }).catch(err=>{
      console.log("Login Fail ! " +err);
    })
  }

  ngOnInit(): void {
  this.passwordManager.currentuser();
  }
}
