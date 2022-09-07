import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  model:any={};

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.model);
    this.accountService.register(this.model).subscribe({
      next:r=>{
                 console.log(r);
                 this.cancel();
              },
      error:e=>{console.log(e);}
    });
  }

  cancel(){
    console.log("cancelled!");
    this.cancelRegister.emit(false); //argument can be anything. It's false because why not.
  }

}
