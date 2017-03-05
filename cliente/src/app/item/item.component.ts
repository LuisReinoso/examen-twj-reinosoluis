import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from "@angular/http";
import { MasterUrlService } from "../master-url.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  controladorSPA = [false, true]

  nuevoItem = {};
  items = [];

  constructor(private _http: Http,
    private _masterURL: MasterUrlService) { }

  ngOnInit() {
    this._http.get(this._masterURL.url + "Item")
      .subscribe(
      (res: Response) => {
        this.items = res.json()
          .map((value) => {
            return value;
          });
      },
      (err) => {
        console.log(err);
      }
      )
  }

  crearItem(formulario: NgForm) {

    this._http.get(this._masterURL.url
      + "Bodega?where={\"nombre\":\"" + formulario.value.bodega + "\"}").subscribe(
      (res) => {

        var bodega = res.json()[0]

        if (bodega) {
          this._http.post(this._masterURL.url + "Item", {
            nombre: formulario.value.nombre,
            cantidad: formulario.value.cantidad,
            peso: formulario.value.peso,
            idBodega: bodega.id
          }).subscribe(
            (res) => {
              this.items.push(res.json());
              this.nuevoItem = {};

              this._http.get(this._masterURL.url + "Item")
                .subscribe(
                (res: Response) => {
                  this.items = res.json()
                    .map((value) => {
                      return value;
                    });
                },
                (err) => {
                  console.log(err);
                }
                )
            },
            (err) => {
              console.log("Ocurrio un error", err);
            }
            );
          }
      },
      (err) => {
        console.log("Ocurrio un error", err);
      }
      );

  }

  eliminiarItem(id: number) {
    this._http.delete(this._masterURL.url + "Item/" + id)
      .subscribe(
      (res) => {
        let itemBorrada = res.json();
        this.items = this.items.filter(value => itemBorrada.id != value.id);
      },
      (err) => {
        console.log(err);
      }
      )
  }

  menu(elemento: number) {
    this.controladorSPA = this.controladorSPA.map(function(value, key) {
      if (key == elemento) {
        return true;
      } else {
        return false;
      }
    })
  }
}
