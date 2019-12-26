import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ContactusComponent } from "./contactus/contactus.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutusComponent } from "./aboutus/aboutus.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "aboutUs", component: AboutusComponent },
  { path: "contactUs", component: ContactusComponent }
  // { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
