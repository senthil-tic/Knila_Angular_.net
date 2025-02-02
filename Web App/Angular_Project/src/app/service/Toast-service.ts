import { Injectable, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];
  constructor() {}

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    console.log("Toast triggered:", textOrTpl);
    
    const toast = { textOrTpl, ...options };
    this.toasts.push(toast);
  
    // Automatically remove toast after 5 seconds (or custom delay)
    setTimeout(() => this.remove(toast), options.delay || 5000);
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  // Optional: Apply trim validation for input fields (your existing method)
  applyTrimValidation(control: AbstractControl | null) {
    control?.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        const trimmedValue = value.trimStart();
        
        if (trimmedValue !== value) {
          control.setValue(trimmedValue, { emitEvent: false });
        }
  
        // Set error if only spaces were entered
        if (trimmedValue === '') {
          control.setErrors({ required: true });
        }
      }
    });
  }
  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
