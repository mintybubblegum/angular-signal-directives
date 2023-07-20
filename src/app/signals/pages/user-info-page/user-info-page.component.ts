import { Component, OnInit, inject, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  private userService = inject(UsersServiceService);
  public userId = signal(1);

  public currentUser = signal<User|undefined>(undefined);
  public userWasFound = signal(true);

  ngOnInit(): void {
    this.loadUser( this.userId() )
  }

  loadUser( id: number ){
    if ( id <= 0 ) return; 

    this.userId.set(id); //si el valor es mayor a 0 lo conecto con el id
    this.currentUser.set(undefined);
  
    this.userService.getUserById( id )
      .subscribe( user => {
        this.currentUser.set( user )
      })
  }


}
