<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DataValues;
use App\Models\Exportvalues;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Mccarlosen\LaravelMpdf\Facades\LaravelMpdf as PDF;


class ReportController extends Controller
{


    private $post;

    function __construct()
    {

        $this->post = request()->post();

    }

    function generateData()
    {




        cache()->forget('query');

        $query = DB::table('data_values')
            ->select(DB::raw('SUM(IF(data_type = "1", data_value, 0)) AS CreditoTotal,SUM(IF(data_type = "-1", data_value, 0)) AS DebitoTotal,count(id) as totaltransacoes'));

        if ($this->post['data_type'] != "") {

            $query = $query->where('data_type', (int) $this->post['data_type']);
        }

        if ($this->post['payment_form'] != "") {

            $query = $query->where('payment_form', (int) $this->post['payment_form']);
        }


        if ($this->post['payment_date_start'] != "") {

            $query = $query->where('payment_date', ">=", $this->post['payment_date_start']);
        }

        if ($this->post['payment_date_end'] != "") {

            $query = $query->where('payment_date', "<=", $this->post['payment_date_end']);
        }


        $query = $query->get();

        foreach ($query as $retorno) {


            $retorno->somatoriatotal = $retorno->CreditoTotal - $retorno->DebitoTotal;

        }


        cache()->remember("query", 600, function () use ($query) {

            return $query;
        });



    }

    function getReport()
    {




        $type = request()->all()['type'];

        switch ($type) {
            case 1:
                $type = \Maatwebsite\Excel\Excel::XLSX;
                $extension = "xlsx";

                break;
            case 2:
                $type = \Maatwebsite\Excel\Excel::MPDF;
                $extension = "pdf";
                $results = cache('query');
                $data = $results;

                $pdf = PDF::loadView('relatoriopdf', ['data' => $data[0]]);
                $pdf->getMpdf()->setFooter('{PAGENO}');
                return $pdf->stream('document.pdf');
                break;
            case 3:
                $type = \Maatwebsite\Excel\Excel::HTML;
                $extension = "html";
                break;
            case 4:
                $type = \Maatwebsite\Excel\Excel::CSV;
                $extension = "csv";
                break;
            case 5:
                $type = \Maatwebsite\Excel\Excel::ODS;
                $extension = "ods";
                break;
        }
        $name = "relatorio_valores_" . date("Y_m_d_H_i_s_") . "." . $extension;
        $data = Excel::download(new Exportvalues, $name, $type);
        session()->forget('seralizedsearch');
        return $data;
    }



}
