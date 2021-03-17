import { Component, OnInit } from "@angular/core";
import { AppService } from "app/app.service";
import { USER_TYPE } from "app/interfaces/user";
import { Trimester } from "app/interfaces/trimester";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "dashboard", class: "" },
  {
    path: "/solicitudes",
    title: "Solicitudes",
    icon: "notifications",
    class: "",
  },
  {
    path: "/laboratorios",
    title: "Laboratorios",
    icon: "desktop_windows",
    class: "",
  },
  {
    path: "/reservas-especiales",
    title: "Reservas Especiales",
    icon: "flare",
    class: "",
  },
  { path: "/metricas", title: "Métricas", icon: "analytics", class: "" },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userName: String = "";
  trimester: String = "";

  constructor(private app: AppService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.app.isUserType(USER_TYPE.LAB_F).then((isLabF) => {
      if (isLabF) {
        this.addAdminRoute();
        this.addUsuariosRoute();
      }
    });
    this.app.isUserType(USER_TYPE.LAB_ADMIN).then((isLabAdmin) => {
      if (isLabAdmin) {
        this.addNewRoomsRoute();
        this.addUsuariosRoute();
      }
    });
    this.userName = localStorage.getItem("userName");
    this.app.getTrimester().subscribe((data) => {
      this.trimester = data[0].id;
    });
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  addAdminRoute() {
    this.menuItems.push({
      path: "/labf-admin",
      title: "Administrar",
      icon: "notifications",
      class: "",
    });
  }

  addNewRoomsRoute() {
    this.menuItems.push({
      path: "/new-rooms",
      title: "Nuevas Salas",
      icon: "notifications",
      class: "",
    });
  }

  addUsuariosRoute() {
    this.menuItems.push({
      path: "/usuarios",
      title: "Usuarios",
      icon: "people",
      class: "",
    });
  }
}
