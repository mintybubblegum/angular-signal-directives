import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>; 
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color( value: string ) { //para que la directiva funcione en nuestro HTML hemos de utilizar SET para establecer un nuevo valor en éste
    this._color = value;
    this.setStyle();
  }

  @Input() set errors( value: ValidationErrors | null | undefined ){
    this._errors = value;
    this.setErrorMessage();
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    // console.log('constructor de la directiva');
    //console.log(el);
    this.htmlElement = el;
  }
  ngOnInit(): void {
    this.setStyle();
  }

  setStyle():void {
    if ( !this.htmlElement )return;

    this.htmlElement!.nativeElement.style.color = this._color; // para acceder al elemento real y modificar su estilo.
  }

  setErrorMessage():void {
    if ( !this.htmlElement )return;
    if ( !this._errors ) {
      this.htmlElement.nativeElement.innerText = 'No errors found';
      return;
    }

    const errorType = Object.keys(this._errors); // muestra en consola el tipo de requerimiento que no cumple --> vemos cual es el error
    //console.log(errorType);

    if ( errorType.includes('required') ) {
      this.htmlElement.nativeElement.innerText = "Field required";
      return;
    }

    if ( errorType.includes('minlength') ) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];


      this.htmlElement.nativeElement.innerText = `minimum of ${ current }/${ min } required`;
      return;
    }

    if ( errorType.includes('email') ) {
      this.htmlElement.nativeElement.innerText = "Please provide a valid email";
      return;
    }
    
  }

}
