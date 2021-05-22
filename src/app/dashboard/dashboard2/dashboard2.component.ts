import { ApiService } from 'app/shared/services/Api.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { DashboardService } from 'app/shared/services/dashboard.service';
import { FormControl } from '@angular/forms';

declare var require: any;

const data: any = require('../../shared/data/chartist.json');


export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}

@Component({
    selector: 'app-dashboard2',
    templateUrl: './dashboard2.component.html',
    styleUrls: ['./dashboard2.component.scss']
})

export class Dashboard2Component implements OnInit {
    // Donut charts
    // CatalogueDonuts = {
    //     series:[
    //         { name: 'done', className: 'ct-done', value: 0},
    //         { name: 'outstanding', className: 'ct-outstanding', value: 0}]
    // }
    filter: any = null;
    DashboardDonut: {
        series: [
          {
            name: 'done',
            className: 'ct-done',
            value: 222
          },
          {
            name: 'outstanding',
            className: 'ct-outstanding',
            value: 222
          }
        ]
      };
    catViews: number;
    prodViews: number;
    BanierViews: number;
    totalComment: number;
    // Total stats
    totalViews: number;
    totalHommes: number;
    totalFemmes: number;
    thisWeek: number =0;
    thisMonth: number=0;
    
    pWeek: number =0;
    pMonth: number=0;

    bWeek: number =0;
    bMonth: number=0;
    /*  date picker */
    displayMonths = 2;
    user: any;
    /// * datepicker */
    navigation = 'select';
    categories: any = []
    produits: any = []
    enseignes: any = []
    catalogues: any = []

    categorie: FormControl = new FormControl(null)
    enseigne: string;
    catalogue: any ;
    views: number
    cities = [
        { id: 1, name: 'Vilnius' },
        { id: 2, name: 'Kaunas' },
        { id: 3, name: 'Pavilnys', disabled: true },
        { id: 4, name: 'Pabradė' },
        { id: 5, name: 'Klaipėda' }
    ];
    popupModel;
    selectedCity: any;
    BarchatData: any;
    BarChart: Chart = {
        type: 'Bar', data: null, options: {
            axisX: {
                showGrid: false,
            },
            axisY: {
                showGrid: false,
                showLabel: false,
                offset: 0
            },
            low: 0,
            high: 60, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        },
        responsiveOptions: [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ],
        events: {
            created(data: any): void {
                const defs = data.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'gradient4',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(238, 9, 121,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(255, 106, 0, 1)'
                });
                defs.elem('linearGradient', {
                    id: 'gradient5',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(0, 75, 145,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(120, 204, 55, 1)'
                });

                defs.elem('linearGradient', {
                    id: 'gradient6',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(132, 60, 247,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(56, 184, 242, 1)'
                });
                defs.elem('linearGradient', {
                    id: 'gradient7',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(155, 60, 183,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(255, 57, 111, 1)'
                });

            },
            draw(data: any): void {
                let barHorizontalCenter, barVerticalCenter, label, value;
                if (data.type === 'bar') {

                    data.element.attr({
                        y1: 195,
                        x1: data.x1 + 0.001
                    });

                }
            }
        },

    };
    // Line chart configuration Starts
    WidgetlineChart: Chart = {
        type: 'Line', data: data['WidgetlineChart2'],
        options: {
            axisX: {
                showGrid: false,
                showLabel: false,
                offset: 0,
            },
            axisY: {
                showGrid: false,
                low: 50,
                showLabel: false,
                offset: 0,
            },
            fullWidth: true
        },
    };
    // Line chart configuration Ends

    // Line chart configuration Starts
    WidgetlineChart1: Chart = {
        type: 'Line', data: data['WidgetlineChart3'],
        options: {
            axisX: {
                showGrid: false,
                showLabel: false,
                offset: 0,
            },
            axisY: {
                showGrid: false,
                low: 50,
                showLabel: false,
                offset: 0,
            },
            fullWidth: true,
            chartPadding: { top: 0, right: 0, bottom: 10, left: 0 }
        },
        events: {
            created(data: any): void {

                const defs = data.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'widgradient',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(132, 60, 247, 1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(56, 184, 242, 1)'
                });

            },

        },
    };
    // Line chart configuration Ends

    // Line chart configuration Starts
    WidgetlineChart2: Chart = {
        type: 'Line', data: data['WidgetlineChart'],
        options: {
            axisX: {
                showGrid: true,
                showLabel: false,
                offset: 0,
            },
            axisY: {
                showGrid: false,
                low: 40,
                showLabel: false,
                offset: 0,
            },
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            fullWidth: true
        },
        events: {
            created(data: any): void {

                const defs = data.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'widgradient1',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(0, 201, 255,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(17,228,183, 1)'
                });
            },

        },
    };
    // Line chart configuration Ends

    // Donut chart configuration Starts
    DonutChart1: Chart = {
        type: 'Pie',
        data:  data['DashboardDonut'],
        options:    {
            donut: true,
            donutWidth: 1,
            startAngle: 0,
            chartPadding: 15,
            labelInterpolationFnc: function (value ) {
                return '';
            }
        },
        events: {
            draw(data: any): void {
                if (data.type === 'label') {
                    if (data.index === 0) {
                        data.element.attr({
                            dx: data.element.root().width() / 2,
                            dy: (data.element.root().height() + (data.element.height() / 2)) / 2,
                            class: 'ct-label font-medium-3',
                            'font-family': 'feather',
                            'font-size': '1%'
                        });
                    } else {
                        data.element.remove();
                    }
                }
            }
        }
    };
    // Donut chart configuration Ends

    // Donut chart configuration Starts
    DonutChart2: Chart = {
        type: 'Pie',
        data: data['DashboardDonut'],
        options: {
            donut: true,
            donutWidth: 3,
            startAngle: 90,
            chartPadding: 25,
            labelInterpolationFnc: function (value) {
                return ' ';
            }
        },
        events: {
            draw(data: any): void {
                if (data.type === 'label') {
                    if (data.index === 0) {
                        data.element.attr({
                            dx: data.element.root().width() / 2,
                            dy: (data.element.root().height() + (data.element.height() / 4)) / 2,
                            class: 'ct-label font-medium-3',
                            'font-family': 'feather'
                        });
                    } else {
                        data.element.remove();
                    }
                }
            }
        }
    };
    // Donut chart configuration Ends

    // Donut chart configuration Starts
    DonutChart3: Chart = {
        type: 'Pie',
        data: data['DashboardDonut'],
        options: {
            donut: true,
            donutWidth: 3,
            startAngle: 270,
            chartPadding: 25,
            labelInterpolationFnc: function (value) {
                return ' ';
            }
        },
        events: {
            draw(data: any): void {
                if (data.type === 'label') {
                    if (data.index === 0) {
                        data.element.attr({
                            dx: data.element.root().width() / 2,
                            dy: (data.element.root().height() + (data.element.height() / 4)) / 2,
                            class: 'ct-label font-medium-3',
                            'font-family': 'feather'
                        });
                    } else {
                        data.element.remove();
                    }
                }
            }
        }
    };
    // Donut chart configuration Ends

    // Line area chart configuration Starts
    lineAreaChart: Chart = {
        type: 'Line',
        data: data['lineArea3'],
        options: {
            low: 0,
            showArea: true,
            fullWidth: true,
            onlyInteger: true,
            axisY: {
                low: 0,
                scaleMinSpace: 50,
            },
            axisX: {
                showGrid: false
            }
        },
        events: {
            created(data: any): void {
                const defs = data.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'gradient',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-opacity': '0.2',
                    'stop-color': 'rgba(255, 255, 255, 1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-opacity': '0.2',
                    'stop-color': 'rgba(38, 198, 218, 1)'
                });
            },
            draw(data: any): void {

                const circleRadius = 6;
                if (data.type === 'point') {
                    const circle = new Chartist.Svg('circle', {
                        cx: data.x,
                        cy: data.y,
                        r: circleRadius,
                        class: 'ct-point-circle'
                    });
                    data.element.replace(circle);
                }
            }
        },
    };
    // Line area chart configuration Ends

    // Line chart configuration Starts
    lineChart2: Chart = {
        type: 'Line', data: data['line2'],
        options: {
            axisX: {
                showGrid: false,
            },
            axisY: {
                low: 0,
                scaleMinSpace: 50,
            },
            fullWidth: true,
        },
        responsiveOptions: [
            ['screen and (max-width: 640px) and (min-width: 381px)', {
                axisX: {
                    labelInterpolationFnc: function (value, index) {
                        return index % 2 === 0 ? value : null;
                    }
                }
            }],
            ['screen and (max-width: 380px)', {
                axisX: {
                    labelInterpolationFnc: function (value, index) {
                        return index % 3 === 0 ? value : null;
                    }
                }
            }]
        ],
        events: {
            draw(data: any): void {
                const circleRadius = 6;
                if (data.type === 'point') {
                    const circle = new Chartist.Svg('circle', {
                        cx: data.x,
                        cy: data.y,
                        r: circleRadius,
                        class: 'ct-point-circle'
                    });
                    data.element.replace(circle);
                } else if (data.type === 'label') {
                    // adjust label position for rotation
                    const dX = data.width / 2 + (30 - data.width)
                    data.element.attr({ x: data.element.attr('x') - dX })
                }
            }
        },

    };
    // Line chart configuration Ends

    // Line chart configuration Starts
    lineChart1: Chart = {
        type: 'Line', data: data['line1'],
        options: {
            axisX: {
                showGrid: false,
            },
            axisY: {
                low: 0,
                scaleMinSpace: 50,
            },
            fullWidth: true
        },
        events: {
            draw(data: any): void {
                if (data.type === 'label') {
                    // adjust label position for rotation
                    const dX = data.width / 2 + (30 - data.width)
                    data.element.attr({ x: data.element.attr('x') - dX })
                }
            }
        },
    };
    // Line chart configuration Ends
    constructor(
        private apiSer: ApiService,
        private dashboardService: DashboardService
    ) {
        this.dashboardService.views.subscribe(data => {

            this.totalViews = data;
        });
        this.dashboardService.homme.subscribe(data => {
            this.totalHommes = data;
        });
        this.dashboardService.femme.subscribe(data => {
            this.totalFemmes = data;
        });


        this.dashboardService.cataloguesWeeksViewsSubject.subscribe(data => {
            this.thisWeek = data;
        });
        this.dashboardService.cataloguesMonthViewsSubject.subscribe(data => {
            this.thisMonth = data;
        });

        this.dashboardService.productWeeksViewsSubject.subscribe(data => {
            this.pWeek = data;
        });
        this.dashboardService.productMonthsViewsSubject.subscribe(data => {
            this.pMonth = data;
        });

        this.dashboardService.allCat.subscribe(data => {
            this.catViews = data;
        });
        this.dashboardService.allprod.subscribe(data => {
            this.prodViews = data;
        });
        this.dashboardService.totalComment.subscribe(data => {
            this.totalComment = data;
        });
        this.dashboardService.getbaniersclicls().then(data=>this.BanierViews = data)
        // this.dashboardService.cataloguesWeeksViewsSubject.subscribe(data => {
        //     this.bWeek = data;
        // });
        // this.dashboardService.cataloguesWeeksViewsSubject.subscribe(data => {
        //     this.bMonth = data;
        // });

        this.user = JSON.parse(localStorage.getItem(environment.currentAdmin))


         // this.CatalogueDonuts.series = []


    }
    ngOnInit(): void {

        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        this.getcategories()
        this.getenseignes()
        this.getcatalogues()
        this.getproduits()
        this.getAllusers()
        this.getviews('a',this.filter)
       this.dashboardService.dashboardbardata.subscribe(data => this.BarchatData = data)
        }
    handleChange(event){
        this.getviews('a',this.filter)
        
    }   
    public getcategories() {
       this.dashboardService.getcategories().then( data => this.categories = data)
    }
    public getenseignes() {
        this.dashboardService.getenseignes().then( data => this.enseignes = data)

    }
    public getcatalogues() {
        this.dashboardService.getcatalogues().then( data => this.catalogues = data)

    }
    public getproduits() {
        this.dashboardService.getproduits().then( data => this.produits = data)

    }
    public getAllusers() {
        this.dashboardService.getAllUsers();

    }
     getviews(id,filter) {
        this.dashboardService.getViews(id,filter).then(data => {
           // this.catViews = data
        });

    }
    getFiltred(item, event) {

        event != null ? this.dashboardService.getFiltredCatalogues('catalogues', event, item).then( data => this.catalogues = data) : this.getcatalogues();
        event != null ? this.dashboardService.getFiltredCatalogues('produits', event, item).then( data => this.produits = data) : this.getproduits();

    }
    getCatalogue(event) {
       // this.CatalogueDonuts.series = [{ name: 'done', className: 'ct-done', value: event.views},{ name: 'outstanding', className: 'ct-outstanding', value: event.views}]
        this.catalogue = event ;
        this.getviews(event.id,this.filter)
       //

    }
    getProduct(event) {
         //this.catalogue = event ;
         
         this.getviews(event.id,this.filter)
        //
 
     }

}
