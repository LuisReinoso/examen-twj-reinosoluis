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
            value.formularioCerrado = true;
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

        var respuesta = res.json()
        respuesta.formularioCerrado = true;

        console.log(respuesta)
        this.bodegas.push(respuesta);
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

  actualizarBodega(bodega: any) {
    let parametos = {
      nombre: bodega.nombre,
      direccion: bodega.direccion,
      capacidad: bodega.capacidad
    };
    this._http.put(this._masterURL.url + "Bodega/" + bodega.id, parametos)
      .subscribe(
        (res: Response) => {
          bodega.formularioCerrado = !bodega.formularioCerrado;
        },
        (err) => {
          console.log("Error:", err);
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
  }
}
