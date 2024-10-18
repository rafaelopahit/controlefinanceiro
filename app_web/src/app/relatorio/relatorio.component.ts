import { Component, OnInit } from '@angular/core';
import { LancamentosService } from '../services/lancamentos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss'],
})
export class RelatorioComponent implements OnInit {
  form: any;
  formaspagamento: any = [{ "nome": "Dinheiro", "value": 1 }, { "nome": "Cartao", "value": 2 }, { "nome": "Boleto", "value": 3 }, { "nome": "Pix", "value": 4 }];


  formularioenviado: boolean = false;

  constructor(private service: LancamentosService) {

    this.form = new FormGroup({})

    this.form.addControl('data_type', new FormControl('', Validators.required));
    this.form.addControl('payment_form', new FormControl('', Validators.required));
    this.form.addControl('payment_date', new FormControl('', Validators.required));
    this.form.addControl('id', new FormControl('', Validators.required));

    this.form.addControl('payment_date_start', new FormControl('', Validators.required));

    this.form.addControl('payment_date_end', new FormControl('', Validators.required));
    this.form.addControl('export_type', new FormControl('', Validators.required));
  }

  ngOnInit() { }

  generateReport() {

    this.service.getReport(this.form.getRawValue()).subscribe((resp: any) => {

      window.open(this.service.masterDomain + "/report/getreport?type=" + this.form.controls['export_type'].value, "_blank");

    })
  }

}
