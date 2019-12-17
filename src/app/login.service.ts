import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private hc: HttpClient, private router: Router) {}

  examinerLogin(data) {
    return this.hc.post("examiner/login", data);
  }
  studentLogin(data) {
    return this.hc.post("student/login", data);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.router.navigate(["home"]);
  }

  isLoggedIn() {
    return localStorage.getItem("token") === null ? false : true;
  }
}
