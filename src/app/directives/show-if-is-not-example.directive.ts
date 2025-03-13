import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShowIfIsNotExample]',
  standalone: true
})
  export class ShowIfIsNotExampleDirective {
    constructor(
      private templateRef: TemplateRef<any>, 
      private viewContainer: ViewContainerRef
    ) {}
  
    @Input() set appShowIfIsNotExample(isExample: boolean) {
      if (!isExample) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }
  }
