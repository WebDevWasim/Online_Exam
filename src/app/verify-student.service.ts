import { LoggedUserService } from "./logged-user.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class VerifyStudentService {
  constructor(
    private loggedUser: LoggedUserService,
    private http: HttpClient
  ) {}

  private examiner = localStorage.getItem("username");

  loadRequestList(): Observable<any[]> {
    return this.http.get<any[]>(`examiner/getRequests/${this.examiner}`);
  }
}
