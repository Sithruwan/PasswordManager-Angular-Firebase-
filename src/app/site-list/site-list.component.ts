import {Component, OnInit} from '@angular/core';
import {PasswordManagerService} from "../services/password-manager.service";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit{

  ngOnInit(): void {
    this.passwordManager.currentuser();
  }

  allsites! : Observable<Array<any>>

  siteName!:string;
  siteURL!:string;
  siteImgURL!:string;
  siteId!:string;
  formState: string ='Add New';

  isSuccess:boolean =false;
  alertMessage:string='';

constructor(private passwordManager : PasswordManagerService) {
  this.loadSites();
}

showAlert(msg:string){
  this.isSuccess=true;
  this.alertMessage=msg;

  setTimeout(()=>{
    this.isSuccess=false;
  },5000);
}

  onSubmit(value: object) {
      if (this.formState=='Add New'){
        console.log(value);
        this.passwordManager.addSite(value).then((res)=>{
          console.log("Data Stored: " + res);
          this.showAlert("Data Stored successfully !");
        }).catch((err)=>{
          console.log("Error Data Store: " +err);
        })
      }else if(this.formState=='Edit'){
        this.passwordManager.updateSite(this.siteId,value).then((res)=>{
          console.log("data updated successfully ! "+res);
          this.showAlert("data updated successfully !");
        }).catch((err)=>{
          console.log("Error Data update: " +err);
        })
      }
  }

  loadSites(){
   this.allsites=this.passwordManager.loadSites();
  }


  editSite(siteName: string, siteURL: string, siteImgURL: string, id:string) {
    this.siteName=siteName;
    this.siteImgURL=siteImgURL;
    this.siteURL=siteURL;
    this.siteId=id;
    this.formState='Edit';
    console.log(siteName,siteURL,siteImgURL,id);
  }


  deleteSite(id:string) {
    this.passwordManager.deleteSite(id).then((res)=>{
      console.log("data deleted successfully ! "+res);
      this.showAlert("data deleted successfully !")
    })
  }

  onCancel( form : NgForm) {
    this.siteName = '';
    this.siteURL = '';
    this.siteImgURL = '';
    form.resetForm();
  }

  OnAddNewBtn() {
    this.formState='Add New';
  }


}
