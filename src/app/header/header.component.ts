import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class MainHeaderComponent {
  @Output() selectedTab = new EventEmitter<string>();

  selectTab(tabName: string) {
    this.selectedTab.emit(tabName);
  }
}
