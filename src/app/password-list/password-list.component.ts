import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {PasswordManagerService} from "../services/password-manager.service";
import {Observable} from "rxjs";
import {AES,enc} from "crypto-js";

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})
export class PasswordListComponent implements OnInit{

  ngOnInit(): void {
    this.passwordManager.currentuser();
  }

  siteName!:string;
  siteURL!:string;
  siteImgURL!:string;
  siteId!:string;

  email!:string;
  username!:string;
  password!:string;
  passwordId!:string;
  formState: string ='Add New';

  passwordList!:Array<any>;
  isSuccess: boolean=false;
  alertMessage: string='';


  constructor(private route :ActivatedRoute, private passwordManager:PasswordManagerService) {

    this.route.queryParams.subscribe((value:any) => {
      this.siteId=value.id;
      this.siteImgURL=value.siteImgURL;
      this.siteName=value.siteName;
      this.siteURL=value.siteURL;
    })
    this.loadPasswords();

  }

  showAlert(msg:string){
    this.isSuccess=true;
    this.alertMessage=msg;

    setTimeout(()=>{
      this.isSuccess=false;
    },5000);
  }

  onSubmit(form:NgForm) {
     const encryptPWD = this.encryptPassword(form.value.password)
    form.value.password=encryptPWD;

    if(this.formState=='Add New'){
      this.passwordManager.addPassword(form.value,this.siteId).then((res)=>{
        console.log("Password stored Successfully! "+res);
        this.showAlert('Password stored Successfully!');
      }).catch((err)=>{
        console.log("Unsuccessfully! "+err);
      })
      form.resetForm()
    } else if(this.formState=='Edit'){
      this.passwordManager.updatePassword(this.siteId,form.value,this.passwordId).then(res=>{
        console.log('Updated successfully! '+res);
        this.showAlert('Password Updated successfully!');
      }).catch(err=>{
        console.log('Error Updated Unsuccessfully! '+err);
      })
      form.resetForm();
    }
  }

  loadPasswords(){
    this.passwordManager.loadPassword(this.siteId).subscribe(value => {
      this.passwordList=value;
    })
  }

  editPassword(email: string, username: string , password: string, passwordId:string) {
      this.email=email;
      this.username=username;
      this.password=password;
      this.passwordId=passwordId;
      this.formState='Edit';
  }

  onCancel(f: NgForm) {
    f.resetForm();
    this.formState='Add New';
  }

  onDelete(passwordId:string) {
    this.passwordManager.deletePassword(this.siteId,passwordId).then(res=>{
      console.log('Deleted successfully! '+res);
      this.showAlert('Password Deleted successfully!')
    }).catch(err=>{
      console.log('Deleted Unsuccessfully! '+err);
    })
  }

  encryptPassword(password:string){
    const securityKey ='Z8WHdbAra3qn21LXfBY2sB61Qa0RZz0U';
    return AES.encrypt(password, securityKey).toString();
  }

  decryptPassword(password:string){
    const securityKey ='Z8WHdbAra3qn21LXfBY2sB61Qa0RZz0U';
    return AES.decrypt(password,securityKey).toString(enc.Utf8);
  }


  onDecrypt(password: string,index:number) {
    const decryptedPassword=this.decryptPassword(password);
    this.passwordList[index].password=decryptedPassword;

  }
}
