import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, ViewChild, OnDestroy, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { customAnimations } from '../animations/custom-animations';
import { ConfigService } from '../services/config.service';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: customAnimations
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toggleIcon', { static: false }) toggleIcon: ElementRef;
  public menuItems: any = [];
  depth: number;
  activeTitle: string;
  role: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  logoUrl = '../../../assets/img/icon.png';
  public config: any = {};
  layoutSub: Subscription;
  user: any
  classAdmin = ''
  classAdmi = 'block'
  classCommercant = false
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private configService: ConfigService,
    private layoutService: LayoutService,
    private authServ: AuthService
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
      this.expanded = true;
    }

    this.layoutSub = layoutService.customizerChangeEmitted$.subscribe(
      options => {
        if (options) {
          if (options.bgColor) {
            if (options.bgColor === 'white') {
              this.logoUrl;
            } else {
              this.logoUrl;
            }
          }

          if (options.compactMenu === true) {
            this.expanded = false;
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = true;
          } else if (options.compactMenu === false) {
            this.expanded = true;
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = false;
          }

        }
      });

  }


  ngOnInit() {
    this.getRole()
    this.config = this.configService.templateConf;
    this.user = localStorage.getItem(environment.currentAdmin)


    if (this.config.layout.sidebar.backgroundColor === 'white') {
      this.logoUrl;
    } else {
      this.logoUrl;
    }


  }

  ngAfterViewInit() {

    setTimeout(() => {
      if (this.config.layout.sidebar.collapsed != undefined) {
        if (this.config.layout.sidebar.collapsed === true) {
          this.expanded = false;
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = true;
        }
        // else if (this.config.layout.sidebar.collapsed === false) {
        //   this.expanded = true;
        //   this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
        //   this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
        //   this.nav_collapsed_open = false;
        // }
      }
    }, 0);


  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  toggleSlideInOut() {
    this.expanded = !this.expanded;
  }

  handleToggle(titles) {
    // console.log(titles);

    this.activeTitles = titles;
  }

  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf('forms/ngx') !== -1) {
      this.router.navigate(['forms/ngx/wizard'], { skipLocationChange: false });
    }
  }
 async getRole() {
    return new Promise(async resolve => {
      this.role = await this.authServ.getRole()

      if (this.role == 'admin') {
        for (const item of ROUTES) {
          if (item.hidden === 'admin') {
            this.menuItems.push(item)
          }
        }
        resolve(this.menuItems)

      } else if (this.role == 'commercant') {
        for (const item of ROUTES) {
          if (item.hidden === 'commercant') {
            this.menuItems.push(item)
          }
        }
        resolve(this.menuItems)

      }
    })



  }
}
