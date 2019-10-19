import { Directive, Input, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective implements OnInit {
  @Input() dropdownMenu: HTMLUListElement;
  private isMenuOpen = false;

  constructor() {

  }

  ngOnInit(): void {
  }

  @HostListener('click') click(evt: Event) {
    this.isMenuOpen = !this.isMenuOpen;
    (this.isMenuOpen === true) ? (this.dropdownMenu.style.display = 'block') : (this.dropdownMenu.style.display = 'none');
  }
}
