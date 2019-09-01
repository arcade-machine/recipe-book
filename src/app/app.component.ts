import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentTab = 'recipe';

  openTab(navigationTab: string) {
    this.currentTab = navigationTab;
  };
}
