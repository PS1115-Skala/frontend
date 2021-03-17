import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { AppService } from "app/app.service";
import { Rooms } from "app/interfaces/rooms";
import { Trimester } from "app/interfaces/trimester";
import { USER_TYPE } from "app/interfaces/user";
declare var $: any;
import * as Chartist from "chartist";

@Component({
  selector: "app-metrics",
  templateUrl: "./metrics.component.html",
  styleUrls: ["./metrics.component.scss"],
})
export class MetricsComponent implements OnInit {
  public selectedRoom: any;
  public rooms: any[];
  public terms: any[] = [];
  public bookingByTerms: number[] = [];
  public selectedBeginTerm: any = undefined;
  public selectedEndTerm: any = undefined;
  public seriesBookingByTerms: number[] = [];
  public seriesNumberStudents: number[] = [];
  public seriesItemsByTerms: number[] = [];
  public totalBookingNumber: number = 0;
  public totalStudents: number = 0;
  public filterBy: string[] = [
    "Trimestre",
    "Rango de Trimestres",
    "Históricos",
  ];
  public selectedfilterBy: string;
  public filterByHistoric: boolean = false;
  public filterByTerm: boolean = true;
  public metricsResponse: any;
  public cardsMetrics: any[] = [];
  is_admin: boolean;
  public careersName: any = {
    "0": "Cortas",
    "1": "Largas",
    "2": "PostGrado",
  };

  constructor(private api: AppService) {}

  getRooms() {
    this.api.getAdminLabs().subscribe((response) => {
      this.rooms = response;
      this.rooms.push({ name: "Todos los laboratorios", id: undefined });
      this.selectedRoom = this.rooms[this.rooms.length - 1];
    });
  }

  getTerms() {
    this.api.getTrimesters().subscribe((response) => {
      this.terms = response;
      this.selectedBeginTerm = this.terms[0];
      this.selectedEndTerm = this.terms[0];
    });
  }

  getMetrics() {
    this.api
      .getMetrics(
        this.selectedRoom,
        this.selectedBeginTerm,
        this.selectedEndTerm
      )
      .subscribe((response) => {
        this.metricsResponse = response;
        if (this.metricsResponse) {
          this.initCardsMetrics();
        }
      });
  }

  changeSelectedRoom(index) {
    this.selectedRoom = this.rooms[index];
    this.getMetrics();
  }

  showValidationError(errorMessage) {
    $.notify(
      {
        icon: "error_outline",
        message: errorMessage,
      },
      {
        type: "danger",
        timer: 2000,
        placement: {
          from: "top",
          align: "right",
        },
      }
    );
  }

  initAllCharts() {
    this.initApprovedVsRejected();
  }

  changeFilterBy(indexFilter) {
    this.selectedfilterBy = this.filterBy[indexFilter];
    // Activamos o desactivamos controles booleanos
    // sabiendo por la posicion del index filterby que filtro tenemos
    switch (indexFilter) {
      // Por trimestre
      case 0:
        this.filterByTerm = true;
        this.filterByHistoric = false;
        this.selectedEndTerm = this.selectedBeginTerm;
        this.getMetrics();
        break;
      // Por rango de trimestre
      case 1:
        this.filterByTerm = false;
        this.filterByHistoric = false;
        this.selectedEndTerm = this.selectedBeginTerm;
        this.getMetrics();
        break;
      // Por historico
      case 2:
        this.filterByTerm = false;
        this.filterByHistoric = true;
        this.selectedEndTerm = undefined;
        this.selectedBeginTerm = this.terms[this.terms.length - 1];
        this.getMetrics();
        break;
    }
  }

  changeSelectedBeginTerm(trimester) {
    // El inicio de trimestre se debe manejar dependiendo del filtro en el que estamos
    // Filtro por trimestre
    if (this.filterByTerm && !this.filterByHistoric) {
      this.selectedBeginTerm = trimester;
      this.selectedEndTerm = trimester;
      this.getMetrics();
      return;
    }
    // Validacion en Rango de trimestre
    if (trimester.finish > this.selectedEndTerm.finish) {
      return this.showValidationError(
        "El trimestre de inicio debe ser anterior al de finalización"
      );
    }
    this.selectedBeginTerm = trimester;
    this.getMetrics();
  }

  changeSelectedEndTerm(trimester) {
    if (trimester.start < this.selectedBeginTerm.start) {
      return this.showValidationError(
        "El trimestre de finalización debe ser posterior al de inicio"
      );
    }
    this.selectedEndTerm = trimester;
    this.getMetrics();
  }

  createBarChart(labels, series, divId) {
    let Chart = {
      labels: labels,
      series: [series],
    };
    let highValue = Math.max(...series) + 1;
    let optionsChart = {
      low: 0,
      high: highValue, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };
    new Chartist.Bar(divId, Chart, optionsChart);
  }

  initApprovedVsRejected() {
    let labels = this.metricsResponse.requestStatus.status;
    let series = this.metricsResponse.requestStatus.request;
    this.createBarChart(labels, series, "#approvedVsRejected");
  }

  initCardsMetrics() {
    this.cardsMetrics = [];
    let totalStudents = {
      icon: "done",
      title: "Número de estudiantes atendidos",
      stat: this.metricsResponse.totalStudents,
    };
    let totalSubjects = {
      icon: "done",
      title: "Asignaturas Atendidas",
      stat: this.metricsResponse.subjects.count,
    };
    let totalDeparments = {
      icon: "done",
      title: "Departamentos Atendidos",
      stat: this.metricsResponse.department.count,
    };
    let totalCareers = {
      icon: "done",
      title: "Carreras Totales Atendidas",
      stat: this.metricsResponse.careers.count,
    };
    let totalLargeCarers = {
      icon: "done",
      title: "Carreras Largas Atendidas",
      stat: this.metricsResponse.careers.undergraduateLargeCount,
    };
    let totalPostgraduateCountCarers = {
      icon: "done",
      title: "Carreras de Postgrado Atendidas",
      stat: this.metricsResponse.careers.postgraduateCount,
    };
    let totalShortCountCarers = {
      icon: "done",
      title: "Carreras Cortas Atendidas",
      stat: this.metricsResponse.careers.undergraduateShortCount,
    };
    this.cardsMetrics.push(
      totalStudents,
      totalSubjects,
      totalDeparments,
      totalCareers,
      totalLargeCarers,
      totalPostgraduateCountCarers,
      totalShortCountCarers
    );
  }

  ngAfterViewChecked() {
    if (this.metricsResponse) {
      this.initAllCharts();
    }
  }

  ngOnInit() {
    try {
      this.getRooms();
      this.getTerms();
      this.getMetrics();
      this.selectedfilterBy = this.filterBy[0];
    } catch (err) {
      console.log("wups");
    }
  }
}
