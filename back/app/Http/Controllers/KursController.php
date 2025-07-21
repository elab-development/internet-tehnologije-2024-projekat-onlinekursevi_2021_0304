<?php

namespace App\Http\Controllers;

use App\Models\Kurs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Http\Resources\KursResource;

class KursController extends Controller
{
   

    public function destroy($id)
{
    try {
       

        $kurs = Kurs::findOrFail($id);
        $user = Auth::user();

        
        if ($user->id === $kurs->user_id || $user->jeRole('admin')) {
           
          
      
       
        $kurs->casovi->each(function ($cas) {
          
            $cas->materijali->each(function ($materijal) {
                if ($materijal->putanja) {
                    $putanjaMaterijala = public_path($materijal->putanja);
                    $putanjaMaterijala = str_replace('/', '\\', $putanjaMaterijala); 

                    
                    if (File::exists($putanjaMaterijala)) {
                        File::delete($putanjaMaterijala);
                    }
                }

              
                $materijal->delete();
            });

            
            $cas->delete();
        });

        
        $kurs->kategorije()->detach();
        if ($kurs->putanja_do_slike) {
            $putanjaBanera = public_path($kurs->putanja_do_slike);
            $putanjaBanera = str_replace('/', '\\', $putanjaBanera); 
          

           
            $direktorijum = dirname($putanjaBanera);
            if (File::exists($direktorijum)) {
                File::deleteDirectory($direktorijum);
            }
        }

      
        $kurs->delete();

        return response()->json(['message' => 'Kurs i svi povezani resursi su uspešno obrisani.'], 200);
  }
        else{
              return response()->json([
                'success' => false,
                'message' => 'Nemate prava da obrišete ovaj kurs.'
            ], 403); 
        }
    } catch (\Exception $e) {
        Log::error('Greška prilikom brisanja kursa: ' . $e->getMessage());
        return response()->json(['message' => 'Došlo je do greške prilikom brisanja kursa.', 'error' => $e->getMessage()], 500);
    }
}










    public function store(Request $request)
{
    try {
       
        $request->validate([
            'naziv' => 'required|string|max:255',
            'opis' => 'nullable|string',
            'kategorije' => 'required|array',
            'kategorije.*.id' => 'exists:kategorije,id',
            'baner' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

       
        $user = Auth::user();
        if(!$user->jeRole('nastavnik')){
              return response()->json([
                'success' => false,
                'message' => 'Nemate prava da kreirate kurs.'
            ], 403); 
        }
        
        $kurs = Kurs::create([
            'naziv' => $request->naziv,
            'opis' => $request->opis,
            'putanja_do_slike' => $this->uploadBaner($request->file('baner'), $request->naziv),
            'user_id' => $user->id, 
        ]);

      
        $categoryIds = collect($request->kategorije)->pluck('id');
        $kurs->kategorije()->sync($categoryIds);

        return response()->json([
            'message' => 'Kurs je uspešno sačuvan.',
            'kurs' => $kurs,
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Došlo je do greške prilikom čuvanja kursa.',
            'error' => $e->getMessage(),
        ], 500);
    }
}


private function uploadBaner($file, $naziv)
{
   
    $sanitizedNaziv = preg_replace('/[^a-zA-Z0-9_-]/', '_', $naziv);
    $extension = $file->getClientOriginalExtension();
    $filename = $sanitizedNaziv . '.' . $extension;

    
    $path = 'app/' . $sanitizedNaziv;

 
    if (!Storage::exists($path)) {
        Storage::makeDirectory($path);
    }

   
   $pathFile = $file->storeAs($path, $filename,'public');

    
    return Storage::url($pathFile);
}





}
