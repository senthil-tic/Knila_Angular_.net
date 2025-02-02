import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { ToastService } from '../service/Toast-service';

@Component({
  selector: 'app-edit-contact',
  imports: [ReactiveFormsModule,CommonModule, RouterModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent {
  contactForm!: FormGroup<any>;
  @Output() modelResponse = new EventEmitter<boolean>();
  @Input() formDetails!: any | null;


  constructor(private fb: FormBuilder,private router: Router,private apiService: ApiService,private toastService: ToastService) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      id:[],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: [''],
      city: ['', [Validators.required]],
      state: ['',[Validators.required]],
      country: ['', [Validators.required]],
      postalCode: ['',[Validators.required]],
    });
    if (this.formDetails) {
      console.log(this.formDetails,'test');
      debugger
      setTimeout(() => {
        this.contactForm.patchValue(this.formDetails);
      }, 100);
        }
  }

  onSubmit() {
    debugger
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      this.toastService.show("Please Fill All Mandatory Fields", { classname: 'bg-warning text-center text-white', delay: 2000 });
      return
    }else{
    const detailsParams = { ...this.contactForm.value };
      this.apiService.update('api/Contacts/'+detailsParams.id,detailsParams).subscribe(res => {
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
