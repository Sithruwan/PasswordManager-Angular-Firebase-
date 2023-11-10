import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc} from "@angular/fire/firestore";
import {Auth, getAuth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore : Firestore , private auth : Auth) {
    this.loadSites();
  }

  addSite(data:object){
    const dbInstance = collection(this.firestore,'sites');
    return addDoc(dbInstance,data);
  }
  loadSites(){
    const dbInstance = collection(this.firestore,'sites');
    return collectionData(dbInstance,{idField:'id'})
  }
  updateSite(id:string, data:object){
    const docInstance = doc(this.firestore,'sites',id);
    return updateDoc(docInstance,data);
  }
  deleteSite(id:string){
    const docInstance = doc(this.firestore,'sites',id);
    return deleteDoc(docInstance);
  }

  // Password Queries

  addPassword(data:object,siteId:string){
    const dbInstance = collection(this.firestore,`sites/${siteId}/passwords`);
    return addDoc(dbInstance,data);
  }
  loadPassword(siteId:string){
    const dbInstance = collection(this.firestore,`sites/${siteId}/passwords`);
    return collectionData(dbInstance,{idField:'id'})
  }
  updatePassword(siteId:string, data:object ,passwordId:string){
    const docInstance = doc(this.firestore,`sites/${siteId}/passwords`,passwordId);
    return updateDoc(docInstance,data);
  }
  deletePassword(siteId:string, passwordId:string){
    const docInstance = doc(this.firestore,`sites/${siteId}/passwords`,passwordId);
    return deleteDoc(docInstance);
  }

  // login queries

  login(email:string, password:string){
    return signInWithEmailAndPassword(this.auth,email,password)
  }
  logout(){
   return  signOut(this.auth);
  }

  currentuser(){
    const user = getAuth().currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
      console.log(displayName," ",email," ",photoURL," ",emailVerified," ",uid);
      return true;
    }else {
      console.log('No user');
      return false;
    }
  }


 }
