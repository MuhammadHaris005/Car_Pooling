import { Component,  OnInit ,AfterViewInit, Input } from '@angular/core';
import { SignUpService } from 'src/app/general.service';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-passenger',
  templateUrl: './review.component.html',
  styleUrls: ['review.component.css'],
})
export class ReviewComponent implements OnInit,AfterViewInit {


  @Input() childMessage: any;
  constructor(private modalService: ModalService,private service : SignUpService) {

  }

  stars:number=5;
  ngOnInit() {
    debugger;
    let a = this.childMessage;
  }

  ngAfterViewInit(){
    this.openModal('custom-modal-3');
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
    let to_ID = this.childMessage[1]
    let booking_ID = this.childMessage[2];
    this.service.PostMethod("api/User/","GiveReview",{from_ID,to_ID,booking_ID,score}).subscribe(res=>{

    })
    this.closeModal('custom-modal-3');
  }
}
