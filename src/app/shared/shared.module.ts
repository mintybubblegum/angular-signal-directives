import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLabelDirective } from './directives/custom-label.directive';



@NgModule({
  declarations: [
    CustomLabelDirective //las directivas tienen que ser declaradas en el modulo como un componente
  ],
  imports: [
    CommonModule
  ],
  exports: [
      CustomLabelDirective,//tenemos que exportar nuestras directivas si queremos usarlas en otros modulos
  ]
})
export class SharedModule { }
