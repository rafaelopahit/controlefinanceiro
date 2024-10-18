import { Component, OnInit } from '@angular/core';
import { LancamentosService } from '../services/lancamentos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss'],
  providers: [CurrencyPipe]
})
export class LancamentosComponent implements OnInit {
  form: any;
  rows: any = [];
  formaspagamento: any = [{ "nome": "Dinheiro", "value": 1 }, { "nome": "Cartao", "value": 2 }, { "nome": "Boleto", "value": 3 }, { "nome": "Pix", "value": 4 }];
  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();
  readonly maskValue: MaskitoOptions = {
    mask: /\d{0,2}(\.\d{1,2})?/,
  };
  formularioenviado: boolean = false;

  constructor(private service: LancamentosService, private currencyPipe: CurrencyPipe) {

    this.form = new FormGroup({})
    this.form.addControl('data_value', new FormControl('', Validators.required));
    this.form.addControl('data_type', new FormControl('', Validators.required));
    this.form.addControl('payment_form', new FormControl('', Validators.required));
    this.form.addControl('payment_date', new FormControl('', Validators.required));
    this.form.addControl('id', new FormControl('0', Validators.required));
  }

  formataNumero(e: any) {

    var valor = e.detail.value;

    var v = valor.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';

    this.form.controls["data_value"].setValue(v);

  }
  ngOnInit() {

    this.getData();
  }

  labelFormadePagamento(propValue: any) {

    return this.formaspagamento.filter((person: any) => person.value == propValue)[0]



  }


  save() {
    this.formularioenviado = true;



    let data = this.form.getRawValue();

    if (this.form.valid) {
      this.service.saveLancamento(data).subscribe((resp: any) => {

        this.getData();
        this.formularioenviado = false;
        this.form.controls['data_value'].setValue(null);
        this.form.controls['data_type'].setValue(null);
        this.form.controls['payment_form'].setValue(null);
        this.form.controls['payment_date'].setValue(null);
        this.form.controls['id'].setValue(0);
      })
    } else {
      console.log(this.form.controls);
    }

  }

  async getData() {
    this.service.getData().subscribe((resp: any) => {

      this.rows = resp;

    })
  }

  get(id: any) {
    this.service.getById(id).subscribe((resp: any) => {

      this.form.controls['data_value'].setValue(resp.data_value);
      this.form.controls['data_type'].setValue(resp.data_type.toString());
      this.form.controls['payment_form'].setValue(resp.payment_form.toString());


      let date = resp.payment_date;
      let splitdate = date.split(" ");



      this.form.controls['payment_date'].setValue(splitdate[0] + "T" + splitdate[1]);
      this.form.controls['id'].setValue(resp.id);

    })

  }
  remove(id: any) {

    this.service.delete(id).subscribe((resp: any) => {
      this.getData();
    });

  }
}



export enum Formasdepagamento {
  Dinheiro = <any>"1",
  Cartao = <any>"2",
  Boleto = <any>"3",
  Pix = <any>"4"
}