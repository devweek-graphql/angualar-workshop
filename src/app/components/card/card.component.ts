import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  private router: Router;

  @Input() characterName = '';
  @Input() characterType = '';
  @Input() characterDescription = '';
  @Input() characterAvatar = '';

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  onClickEdit(event: Event) {
    event.stopPropagation();
  }

  onClickDelete(event: Event) {
    event.stopPropagation();
  }

  onClickCharacter() {
    this.router.navigate(['character', this.characterName]);
  }
}
