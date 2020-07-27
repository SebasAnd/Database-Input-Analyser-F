import { Component, OnInit } from '@angular/core';
import{ConectionService} from '../conection.service';


@Component({
  selector: 'app-showdb',
  templateUrl: './showdb.component.html',
  styleUrls: ['./showdb.component.css']
})
export class ShowdbComponent implements OnInit {
  public code:String;
  public visible:boolean;

  private dbtable: String[][];

  constructor(private Conection: ConectionService) {
    this.code='';
    this.visible = true;
   }

  ngOnInit() {
  }

  search():void{
    this.Conection.getDb(this.code)
      .subscribe((response) => {
        this.dbtable = response.results;
        if(this.dbtable.length > 0){
          this.visible = false;
        }
        if(this.dbtable.length == 0){
          this.visible = true;
        }
      });
      
  }
}
