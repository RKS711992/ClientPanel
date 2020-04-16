import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  register(email: string, password: string) {
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(userData=>resolve(userData),err=> reject(err))
    });
  }

  constructor(private afAuth: AngularFireAuth) { }

  login(email : string, password: string){
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email,password).then(userData=>resolve(userData),err=> reject(err))
    });
  }

  getAuth(){
    return this.afAuth.authState.pipe(
      map(auth=>auth));
    //return this.afAuth.authState.pipe(first()).toPromise();
  }

  logout(){
    this.afAuth.auth.signOut();
  }
}
