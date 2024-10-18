<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataValues as RequestsDataValues;
use App\Models\DataValues;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Contracts\Validation\Validator;
class ValuesController extends Controller
{

    private $post;

    function __construct()
    {

        $this->post = request()->post();

    }

    function list()
    {
        return (new DataValues())->get();
    }


    function insertData(RequestsDataValues $validate)
    {

        try {

            $model = new DataValues();

            if ($this->post['id'] != 0)
                $model = $model->find($this->post['id']);


            $model->data_value = $this->post['data_value'];


            $explode = explode(".", $model->data_value);


            $fim = end($explode);






            $model->data_type = $this->post['data_type'];
            $model->payment_form = $this->post['payment_form'];
            $model->user_id = 1;


            $explode = explode("T", $this->post['payment_date']);
            $model->payment_date = $explode[0] . " " . $explode[1];


            $model->save();

            if ($model->id) {
                return response()->json(['success' => true]);
            }
        } catch (\Exception $ex) {

            return response()->json(['success' => false]);

        }

    }


    function getById($id)
    {
        return response()->json((new DataValues())->find($id));
    }

    function deleteData($id)
    {
        try {

            $model = new DataValues();
            $model = $model->find($id);
            $model->forceDelete();
            return response()->json(['success' => true]);
        } catch (\Exception $ex) {

            return response()->json(['success' => false]);

        }
    }





}
