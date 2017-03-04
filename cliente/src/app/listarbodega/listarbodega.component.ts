import { Component, OnInit } from '@angular/core';
import { Http, Response } from "@angular/http";
import { MasterUrlService } from "../master-url.service";

@Component({
  selector: 'app-listarbodega',
  templateUrl: './listarbodega.component.html',
  styleUrls: ['./listarbodega.component.css']
})
export class ListarbodegaComponent implements OnInit {

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
        console.log("Correcto");
        console.log(res.json());
      },
      (err) => {
        console.log(err);
      }
      )
  }
}
