import { Component, OnInit, IterableDiffers } from '@angular/core';

import{ConectionService } from '../conection.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-manage-db.component',
  templateUrl: './manage-db.component.html',
  styleUrls: ['./manage-db.component.css']
})
export class ManageDbComponent implements OnInit {

  private tableDb: String[][];
  public  codigo_camp:String;
  private column_availability: boolean [];
  private nombre :boolean[];
  private apellido :boolean[];
  private telefono :boolean[];
  private direccion :boolean[];

  private gridcss: String[][];
  private tablecss: String[];

  private nombrecolumnid: Number[];
  private apellidocolumnid: Number[];
  private telefonocolumnid: Number[];
  private direccioncolumnid: Number[];

  private information :number;
  public separator_input :String;
  public event_input:any;
  staticAlertClosed = false;
  successMessage = '';
  public type: string;
  private _success = new Subject<string>();

  

  private look_area :boolean;
  constructor(
    private Conection: ConectionService,
  ) {

    this.nombre=Array<boolean>();
    this.apellido=Array<boolean>();
    this.telefono=Array<boolean>();
    this.direccion=Array<boolean>();
    this.codigo_camp= '';

    this.nombrecolumnid= Array<Number>();
    this.apellidocolumnid= Array<Number>();
    this.telefonocolumnid= Array<Number>();
    this.direccioncolumnid= Array<Number>();

    this.look_area = true;

    this.gridcss =[];
    this.tablecss  = [];
    this.information = 4;
    this.separator_input = '';
   }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(2000)
    ).subscribe(() => this.successMessage = '');
  }

  public alertMessage(type,message) {
    this.type =type;
    this._success.next(message);
  }
  
  showDb(file):String[][]{
    var array_information = [];
    var lines = file.split('\n');  
      for(var i = 0; i < lines.length; i++){
        /*if(lines[i].includes("  ")){
        array_information.push(lines[i].split(/[/\s+/]+?[/\s+/]/));
       
        }else{
          array_information.push(lines[i].split(/[/,.%/]/));
  
        }*/
        array_information.push(lines[i].split(this.separator_input));
      }      
      return array_information; 
  }

  send_information(index):void{
    if(this.column_availability[index]== true){
      this.column_availability[index]= false;
    }
    
  }
  columnselected(element,index):void{
    if(element =='nombre' && this.apellido[index] == false&& this.telefono[index] == false&& this.direccion[index]==false){
      this.nombrecolumnid.push(index);
      this.gridcss[0][index] = element;
      this.tablecss[index]= element;
      this.apellido[index] = true;
      this.telefono[index] = true;
      this.direccion[index]= true;
    }else{
      if(element =='nombre' && this.apellido[index] == true&& this.telefono[index] == true&& this.direccion[index]==true){
        this.nombrecolumnid.splice(this.nombrecolumnid.indexOf(index),1);
        this.gridcss[0][index] = 'clasiccell';
        this.tablecss[index]= 'clasiccell';
        this.apellido[index] = false;
        this.telefono[index] = false;
        this.direccion[index]= false;
      }

    }
    if(element =='apellido' && this.nombre[index] == false&& this.telefono[index] == false&& this.direccion[index]==false){
      this.apellidocolumnid.push(index);
      this.gridcss[1][index] = element;
      this.tablecss[index]= element;
      this.nombre[index] = true;
      this.telefono[index] = true;
      this.direccion[index]= true;
    }else{
      if(element =='apellido' && this.nombre[index] == true&& this.telefono[index] == true&& this.direccion[index]==true){
        this.apellidocolumnid.splice(this.apellidocolumnid.indexOf(index),1);
        this.gridcss[1][index] = 'clasiccell';
        this.tablecss[index]= 'clasiccell';
        this.nombre[index] = false;
        this.telefono[index] = false;
        this.direccion[index]= false;
      }
    }
    if(element =='telefono' && this.nombre[index] == false&& this.apellido[index] == false&& this.direccion[index]==false){
      this.telefonocolumnid.push(index);
      this.gridcss[2][index] = element;
      this.tablecss[index]= element;
      this.nombre[index] = true;
      this.apellido[index] = true;
      this.direccion[index]= true;
    }else{
      if(element =='telefono' && this.nombre[index] == true&& this.apellido[index] == true&& this.direccion[index]==true){
        this.telefonocolumnid.splice(this.telefonocolumnid.indexOf(index),1);
        this.gridcss[2][index] = 'clasiccell';
        this.tablecss[index]= 'clasiccell';
        this.nombre[index] = false;
        this.apellido[index] = false;
        this.direccion[index]= false;
      }
    }
    if(element =='direccion' && this.nombre[index] == false&& this.apellido[index] == false&& this.telefono[index]==false){
      this.direccioncolumnid.push(index);
      this.gridcss[3][index] = element;
      this.tablecss[index]= element;
      this.nombre[index] = true;
      this.apellido[index] = true;
      this.telefono[index]= true;
    }else{
      if(element =='direccion' && this.nombre[index] == true&& this.apellido[index] == true&& this.telefono[index]==true){
        this.direccioncolumnid.splice(this.direccioncolumnid.indexOf(index),1);
        this.gridcss[3][index] = 'clasiccell';
        this.tablecss[index]= 'clasiccell';
        this.nombre[index] = false;
        this.apellido[index] = false;
        this.telefono[index]= false;
      }
    }
    
  }

  createElement():void{
    
    let nombres = Array<String>();
    for(let n = 0; n < this.tableDb.length;n++){
      if(this.nombrecolumnid.length > 1){
        let contain = '';
        for (let m = 0; m < this.nombrecolumnid.length;m++){
          contain = contain +" "+ this.tableDb[n][parseInt(''+this.nombrecolumnid[m])];
        }
        nombres.push(contain);
      }else{
        nombres.push(this.tableDb[n][parseInt(''+this.nombrecolumnid[0])])
      }
    }
    let apellidos = Array<String>();
    for(let n = 0; n < this.tableDb.length;n++){
      if(this.apellidocolumnid.length > 1){
        let containap = '';
        for (let m = 0; m < this.apellidocolumnid.length;m++){
          containap = containap +" "+ this.tableDb[n][parseInt(''+this.apellidocolumnid[m])];
        }
        apellidos.push(containap);
      }else{
        apellidos.push(this.tableDb[n][parseInt(''+this.apellidocolumnid[0])])
      }
    }
    let telefonos = Array<String>();
    for(let n = 0; n < this.tableDb.length;n++){
      if(this.telefonocolumnid.length > 1){
        let containtel = '';
        for (let m = 0; m < this.telefonocolumnid.length;m++){
          containtel = containtel +" "+ this.tableDb[n][parseInt(''+this.telefonocolumnid[m])];
        }
        telefonos.push(containtel);
      }else{
        telefonos.push(this.tableDb[n][parseInt(''+this.telefonocolumnid[0])])
      }
    }
    let direccion = Array<String>();
    for(let n = 0; n < this.tableDb.length;n++){
      if(this.direccioncolumnid.length > 1){
        let containdir = '';
        for (let m = 0; m < this.direccioncolumnid.length;m++){
          containdir = containdir +" "+ this.tableDb[n][parseInt(''+this.direccioncolumnid[m])];
        }
        direccion.push(containdir);
      }else{
        direccion.push(this.tableDb[n][parseInt(''+this.direccioncolumnid[0])])
      }
    }

    if(this.codigo_camp == ""||this.codigo_camp== "null"||this.codigo_camp== "undefined"){
      this.alertMessage('danger',"Debe ingresar el codigo de campaña");
    }
    else{
      /*if(this.nombrecolumnid.length == 0 || this.apellidocolumnid .length == 0 ||this.telefonocolumnid.length == 0||this.direccioncolumnid.length == 0){
        alert("Debe sleccionar al menos una columna para cada campo requerido");

      }else{*/
        
        let jsonreturn = {
          'nombres' : nombres,
          'apellidos':apellidos,
          'telefonos': telefonos,
          'direcciones':direccion,
          'codigo_camp': this.codigo_camp
        }

        this.Conection.saveDb(jsonreturn).subscribe((response) => {
          this.alertMessage('success',response.message);
        });
        this.cleanGrid();
      //}
    }
    

  }
  file_change(event: any):void{
      this.event_input = event;
  }
  
  handleFileInput( ):void{
    
    const reader = new FileReader();
    console.log(this.event_input);
    if(this.event_input == undefined){
      this.alertMessage('danger','No se selecciono ningun archivo');
    }
    if(this.separator_input == ''){
      this.alertMessage('danger','No se ha escrito el separador para la informacion');
    }
    else{
    if (this.event_input.target.files && this.event_input.target.files.length) {
      this.look_area = false;
      const [file] = this.event_input.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
          let file = ''+reader.result;
          let text = atob(file.split(',')[1]);
          let tem_information = this.showDb(text);
          
          let max_columns = 0;

          for(let t = 0 ; t < tem_information.length;t++){
            if (tem_information[t].length > max_columns){
              max_columns = tem_information[t].length;
            }
          }
          for(let r = 0 ; r < tem_information.length;r++){
            if (tem_information[r].length < max_columns){
              for(let n = 0 ; n < max_columns - tem_information[r].length;n++){
                tem_information[r].push("-");

              }
            }
          }
          this.tableDb = tem_information;
          this.gridcss = [];
          for(let i = 0; i < this.information; i++){
            let array_constructor = [];
            for(let j = 0; j < max_columns;j++){
              array_constructor.push('clasiccell');
            }
            this.gridcss.push(array_constructor);
            array_constructor =[];
          }
          this.tablecss =[];
          for(let j = 0; j < max_columns;j++){
            this.tablecss.push('clasiccell');
          }
          

          let array_position = Array<boolean>();

          for(let l = 0; l < max_columns; l++){
            this.nombre.push(false);
            this.apellido.push(false);
            this.telefono.push(false);
            this.direccion.push(false);
          }
          this.cleanGrid();
          
      }
    }
      
    }

  }
  cleanGrid():void{

    for(let i = 0; i < this.tableDb[0].length;i++){
      this.nombre[i] = false;
      this.apellido[i] = false;
      this.telefono[i]= false;
      this.direccion[i] = false;
    }
    this.nombrecolumnid = [];
    this.apellidocolumnid = [];
    this.telefonocolumnid = [];
    this.direccioncolumnid = [];

    for(let i = 0; i < this.information; i++){
      
      for(let j = 0; j < this.tableDb[0].length;j++){
        this.gridcss[i][j] = 'clasiccell';
      }
      
    }
    for(let j = 0; j < this.tableDb[0].length;j++){
      this.tablecss[j] = 'clasiccell';
    }
    if(this.codigo_camp != ''){
      this.codigo_camp = ''
    }
      
  }
  


}
