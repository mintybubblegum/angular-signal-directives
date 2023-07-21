import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnDestroy, OnInit {

  public counterButton = signal(10);

  public user = signal<User>({
    "id": 2,
    "email": "janet.weaver@reqres.in",
    "first_name": "Janet",
    "last_name": "Weaver",
    "avatar": "https://reqres.in/img/faces/2-image.jpg"
  });

  public fullName = computed( () =>  `${ this.user()?.first_name } ${ this.user()?.last_name }`)

  public userChangedEffect = effect( () => {
    console.log(`${ this.user().first_name } - ${ this.counterButton() }`);
    
  });

  ngOnInit(): void { //mostrar limpieza automática del efecto, sin emitir valores cuando estás en otra ventana
    setInterval(() => {
      this.counterButton.update( current => current + 1 )

      //*para que nuestro efecto se pare en un numero de segundos determinado (15)
      //if ( this.counterButton() == 15 )
      //  this.userChangedEffect.destroy();
    },1000)
  }

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }

  increaseBy(value: number) {
    this.counterButton.update( current => current + value )
  }

  onFieldUpdated( field: keyof User, value: string ){
  
    //olvidate del valor anterior, no me importa
  //  this.user.set({
  //    ...this.user(),
  //    [field]: value,
  //  })


  //el valor que yo retorne en el callback va a ser el nuevo valor del signal
  this.user.update( current => {
    return{
      ...current,
      [field]: value
    }
  })


  //cuando se hace algún cambio se dispara automáticamente la actualización
  this.user.mutate( current => {

    switch( field ) {
      case 'email':
        current.email = value;
      break;

      case 'first_name':
        current.first_name = value;
      break;

      case 'last_name':
        current.last_name = value;
      break;

      case 'id':
        current.id = Number(value);
      break;
    }

  })
    
  }

}
