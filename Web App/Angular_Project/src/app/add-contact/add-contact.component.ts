import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { ToastService } from '../service/Toast-service';


@Component({
  selector: 'app-add-contact',
  imports: [ReactiveFormsModule,CommonModule, RouterModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',

})
export class AddContactComponent {
  contactForm!: FormGroup<any>;
  @Output() modelResponse = new EventEmitter<boolean>();


  constructor(private fb: FormBuilder,private router: Router,private apiService: ApiService,private toastService: ToastService) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(3)]],
      LastName: [''],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      Address: [''],
      City: ['', [Validators.required]],
      State: ['',[Validators.required]],
      Country: ['', [Validators.required]],
      PostalCode: ['',[Validators.required]],
    });
  }

  onSubmit() {
    debugger
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      this.toastService.show("Please Fill All Mandatory Fields", { classname: 'bg-warning text-center text-white', delay: 2000 });
      return
    }else{
    const detailsParams = { ...this.contactForm.value };
      this.apiService.insert('api/Contacts', detailsParams).subscribe(res => {
        console.log(res,'res');
        
        this.modelResponse.emit(false);
        this.toastService.show('Contacts Updated Successfully', { classname: 'bg-success text-center text-white', delay: 2000 });
        this.router.navigate(['/contacts']);
      }, err => {
        console.log(err);
        this.toastService.show("something Went wrong", { classname: 'bg-warning text-center text-white', delay: 1000 });
      },
      )
    }


  }
}
