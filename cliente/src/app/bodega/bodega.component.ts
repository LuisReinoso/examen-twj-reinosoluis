import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from "@angular/http";
import { MasterUrlService } from "../master-url.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent implements OnInit {

  constructor(private _http: Http,
              private _masterURL: MasterUrlService) { }

  ngOnInit() {
  }

  crearBodega(formulario: NgForm) {

    this._http.post(this._masterURL.url + "Bodega", {
      nombre: formulario.value.nombre,
      direccion: formulario.value.direccion,
      capacidad: formulario.value.capacidad
    }).subscribe(
      (res) => {
        // TODO: Limpieza
      },
      (err) => {
        console.log("Ocurrio un error", err);
      }
    );
  }

}
