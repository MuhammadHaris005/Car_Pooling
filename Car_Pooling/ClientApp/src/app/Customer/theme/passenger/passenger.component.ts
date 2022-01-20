import { Component,  OnInit ,AfterViewInit, Input } from '@angular/core';
import { SignUpService } from 'src/app/general.service';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['passenger.component.css'],
})
export class PassengerComponent implements OnInit,AfterViewInit {


  @Input() childMessage: any;
  constructor(private modalService: ModalService,private service : SignUpService) {

  }

  stars:number=5;
  ngOnInit() {
    debugger;
    let a = this.childMessage;
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
  Score(){
    debugger;
    let score= this.stars;
    let from_ID = this.childMessage[0];
    let booking_ID = this.childMessage[1];
    this.service.PostMethod("api/User/","GiveReview",{from_ID,booking_ID,score}).subscribe(res=>{

    })
    this.closeModal('custom-modal-1');
  }
}
