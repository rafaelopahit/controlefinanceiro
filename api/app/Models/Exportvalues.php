<?php

namespace App\Models;

use PhpOffice\PhpSpreadsheet\Writer\Pdf;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\BeforeWriting;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class Exportvalues implements FromCollection, WithHeadingRow, WithHeadings, WithEvents, ShouldAutoSize
{

    public function collection()
    {
        $results = cache('query');
        $data = $results;
        return $data;
    }

    public function headings(): array
    {
        return ['valortotalcredito', 'valortotaldebito', 'total_transacoes', 'valortotal'];
    }


    public function registerEvents(): array
    {
        return [

            BeforeSheet::class => [self::class, "beforeSheet"],


        ];
    }


    public static function beforeSheet(BeforeSheet $event)
    {

        $event->sheet->getPageSetup()
            ->setOrientation(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::ORIENTATION_LANDSCAPE);
    }
}
