import { Injectable } from "@angular/core";
import decode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class LoggedUserService {
  // Decoding Token
  public token = localStorage.getItem("token");
  public payload = decode(this.token);

  loggedUserName() {
    return this.payload.username;
  }

  constructor() {}
}
