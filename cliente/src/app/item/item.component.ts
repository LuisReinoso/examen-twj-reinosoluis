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

        console.log(res.json())
        this.items = res.json()
          .map((value) => {
            value.formularioCerrado = true;
            console.log(value)
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
              this.nuevoItem = {};

              this._http.get(this._masterURL.url + "Item")
                .subscribe(
                (res: Response) => {
                  this.items = res.json()
                    .map((value) => {
                      value.formularioCerrado = true;
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
        } else {
          console.log("Ocurrio un error parametros");
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

  actualizarItem(item: any) {

    this._http.get(this._masterURL.url
      + "Bodega?where={\"nombre\":\"" + item.idBodega.nombre + "\"}").subscribe(
      (res) => {
        var bodega = res.json()[0]

        if (bodega) {
          let parametos = {
            nombre: item.nombre,
            cantidad: item.direccion,
            peso: item.capacidad,
            idBodega: bodega.id
          };
          this._http.put(this._masterURL.url + "Item/" + item.id, parametos)
            .subscribe(
            (res: Response) => {
              item.formularioCerrado = !item.formularioCerrado;
            },
            (err) => {
              console.log("Error:", err);
            }
            )
        } else {
          console.log("Ocurrio un error parametros");
        }
      },
      (err) => {
        console.log("Ocurrio un error", err);
      }
      );

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
