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

  controladorSPA = [false, true]

  nuevaBodega = {};
  bodegas = [];

  constructor(private _http: Http,
              private _masterURL: MasterUrlService) { }

  ngOnInit() {
    this._http.get(this._masterURL.url + "Bodega")
      .subscribe(
      (res: Response) => {
        this.bodegas = res.json()
          .map((value) => {
            return value;
          });
      },
      (err) => {
        console.log(err);
      }
      )

    this.controladorSPA = [false, true]
  }

  crearBodega(formulario: NgForm) {
    this._http.post(this._masterURL.url + "Bodega", {
      nombre: formulario.value.nombre,
      direccion: formulario.value.direccion,
      capacidad: formulario.value.capacidad
    }).subscribe(
      (res) => {
        this.bodegas.push(res.json());
        this.nuevaBodega = {};
      },
      (err) => {
        console.log("Ocurrio un error", err);
      }
    );
  }

  eliminiarBodega(id: number) {
    this._http.delete(this._masterURL.url + "Bodega/" + id)
      .subscribe(
      (res) => {
        let bodegaBorrada = res.json();
        this.bodegas = this.bodegas.filter(value => bodegaBorrada.id != value.id);
      },
      (err) => {
        console.log(err);
      }
      )
  }

  menu(elemento: number) {
    this.controladorSPA = this.controladorSPA.map(function (value, key) {
      if (key == elemento) {
        return true;
      } else {
        return false;
      }
    })
    console.log(this.controladorSPA);
  }
}
