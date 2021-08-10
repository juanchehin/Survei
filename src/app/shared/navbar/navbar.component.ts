import { Component, AfterViewInit, ViewChild, Renderer2, ElementRef, HostListener  } from '@angular/core';
import { TokenStorage } from 'src/app/pages/core/token.storage';
//  import { NavbarComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit  {

  @ViewChild('nav', { static: true }) nav: any;
  autorization = localStorage.getItem('autorization');
  constructor(
    private renderer: Renderer2, 
    private el: ElementRef,
    private tokenSrv: TokenStorage,
    ) {
      
    }
  
  transformDropdowns() {
  const dropdownMenu = Array.from(this.el.nativeElement.querySelectorAll('.dropdown-menu'));
  const navHeight = this.nav.navbar.nativeElement.clientHeight + 'px';
  
  dropdownMenu.forEach((dropdown) => {
    this.renderer.setStyle(dropdown, 'transform', `translateY(${navHeight})`);
  });
  }
  
  @HostListener('click', ['$event'])
  onClick(event) {
  const toggler = this.el.nativeElement.querySelector('.navbar-toggler');
  const togglerIcon = this.el.nativeElement.querySelector('.navbar-toggler-icon');
  if (event.target === toggler || event.target === togglerIcon) {
    console.log('test');
    setTimeout(() => {
      this.transformDropdowns();
    }, 351);
  }
  }
  
  @HostListener('document:scroll')
  onScroll() {
  this.transformDropdowns();
  }
  
  @HostListener('window:resize')
  onResize():void  {
    this.transformDropdowns();
  }
  
  ngAfterViewInit() {
  this.transformDropdowns();
  }
  cerrarSesion() {
    this.tokenSrv.signOut();
  }
}
