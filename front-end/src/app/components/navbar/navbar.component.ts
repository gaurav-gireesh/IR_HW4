import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from  'angular2-flash-messages';
import {Router} from '@angular/router';

import {SearchService} from '../../services/search.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  keyword:String;
  result:any;
  constructor(private flash:FlashMessagesService,private router:Router,private searchService:SearchService) { }

  ngOnInit() {
  }



  process()
  {
    console.log("Process called");
    
    if(this.keyword==undefined || this.keyword.length==0)
    {
        this.result=null;
        this.flash.show("Please enter a Keyword!!",{cssClass:'alert-danger',timeout:2000});
        return false;
    }

    else{
      // console.log("Sending to component+"+this.keyword);
      //     this.router.navigate(['search',{keyword:this.keyword}]);
      //     return false;
      this.searchService.search(this.keyword).subscribe(data=>{
          this.result=data;
       
      },
      err=>{
        this.flash.show("Oops.. SORRY! Our Backend Service seems to be snoozing. Be back in a while...",{cssClass:'alert-info',timeout:5000});
        return false;
      }
    
    
      );

      return false;
    }
  }


  clear()
  {
    this.result=null;
    this.keyword=null;
  }

}
