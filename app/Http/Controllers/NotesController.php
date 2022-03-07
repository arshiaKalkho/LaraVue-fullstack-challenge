<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notes;
use Illuminate\Support\Facades\Auth;
class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            return Notes::where('author', Auth::user()->id)->get();
        
        }catch(Exception $err){
            dd($err);
        }
    }
    //
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newNote = new Notes;
        $newNote->author =Auth::user()->id;
        $newNote->title = $request->get('title');
        $newNote->content = $request->get('content');

        try{
            $newNote->save();
            return response()->json([
                'note'=> $newNote
            ], 201);
        
        }catch(Exception $err){
            dd($err);
        }
    }
    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{
            $note = Notes::find($id);
            
            
            $note->title = $request->get('title');
            $note->content = $request->get('content');
            $note->update();
            return response()->json([
                'note'=> $note
            ], 201); 
        
        }catch(Exception $err){
            dd($err);
        }
            


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            Notes::findOrFail($id)->delete();
            return response(null, 204);
        }catch(Exception $err){
            dd($err);
        }
    }
}
