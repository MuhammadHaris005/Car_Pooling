import { Component,  OnInit ,AfterViewInit } from '@angular/core';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['passenger.component.css'],
})
export class PassengerComponent implements OnInit,AfterViewInit {

  constructor(
    private modalService: ModalService) {

     }


  ngOnInit() {
  }
  ngAfterViewInit(){
    this.openModal('custom-modal-1');
  }

    openModal(id: string) {
      debugger;
      this.modalService.open(id);
    }

  closeModal(id: string) {
      this.modalService.close(id);
  }
  // Get Current Location Coordinates


}
