import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { ApiService } from '../service/api.service';
import { TableModule } from 'primeng/table';
import { EditContactComponent } from "../edit-contact/edit-contact.component";
import { ToastService } from '../service/Toast-service';
@Component({
  selector: 'app-contact-list',
    imports: [CommonModule, RouterModule, ButtonModule, AddContactComponent, EditContactComponent,TableModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  contactData: any[] = [];
  formDetails!: any | null;
  isModalOpen: boolean = false;
  deleteContactid:any ;
  constructor(private router: Router,private modalService: NgbModal,private apiService: ApiService,private toastService:ToastService) {}

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.apiService.get('api/Contacts').subscribe(data => {
      this.contactData = data;      
    },
      err => {
        this.toastService.show("something Went wrong", { classname: 'bg-warning text-center text-white', delay: 2000 });
      })
  }

  openAddContactModal() {
    this.router.navigate(['/add-contact']);
  }

  detailsModel(dataModal: any) {
    this.modalService.open(dataModal, { size: 'lg', centered: true });
  }
  modelResponse(event:any) {
      this.getAllContacts();
      this.modalService.dismissAll();
    
  }

  openEditContactModal(dataModal: any,data?: any,) {
    debugger
    this.formDetails = data;
    this.modalService.open(dataModal, { size: 'lg', centered: true });
  }
  EditmodelResponse(event:any) {
      this.getAllContacts();
      this.modalService.dismissAll();
  }

  deleteContact(content: any,data?:any,) {
    debugger
    this.deleteContactid = data.id
    // this.toggleModal(true)
    this.modalService.open(content, { size: 'md', centered: true });
  }
  toggleModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  deleteOpportunity() {
    this.apiService.delete('api/Contacts/'+ this.deleteContactid).subscribe((res) => {
            
          this.toastService.show("Contact Delete Successfully", { classname: 'bg-success text-center text-white', delay: 2000 });
          setTimeout(() => {
            this.getAllContacts();
            }, 1000);
       },err => {
        console.log(err);
        this.toastService.show("something Went wrong", { classname: 'bg-warning text-center text-white', delay: 2000 });
      })
      };
}
