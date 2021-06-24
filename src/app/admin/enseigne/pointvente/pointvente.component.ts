import { Component, OnInit, Input, Output, EventEmitter, ViewChild, NgZone, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsList } from '@ng-select/ng-select/ng-select/items-list';
import { PointVente } from 'app/shared/Model/pointVente';
import { ApiService } from 'app/shared/services/Api.service';
import { Enseigne } from 'app/shared/Model/Enseigne';
import Swal from 'sweetalert2';
declare var google;

@Component({
  selector: 'app-pointvente',
  templateUrl: './pointvente.component.html',
  styleUrls: ['./pointvente.component.css']
})
export class PointventeComponent implements OnInit,AfterViewInit {
  pointventes: PointVente[] = [];
  enseignes: Enseigne = new Enseigne(null, '', '', '', '',null, []);
  latppppppppv:any;
  lngggggggg:any;
  show = 0;
  lat: any;
  lng: any;
  address: string;
  // address: Object;
  establishmentAddress: string;
  latt:any;
  longt:any;
  formattedAddress: string;
  formattedEstablishmentAddress: string;
  idUpdate:"";
  addressPv:any;
  phone: string;
  listPvByEnseigne=[];
  @Output() indexpointvente: EventEmitter<number> = new EventEmitter<number>();

  @Input('item') data: PointVente;
  @Input('index') i: number;
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext', {static: false}) addresstext: any;
  IdEnseigne:"";
  autocompleteInput: string;
  queryWait: boolean;
  constructor( public zone: NgZone,
    private apiSer: ApiService,
    private activeRoute: ActivatedRoute,

    ) { 
      this.activeRoute.params.subscribe((res: any) => {
        if (res) {
          this.idUpdate = res.idEdit;
          //
        }
      });
    }

  ngOnInit() {
    this.activeRoute.params.subscribe((res: any) => {
      if (res.idEdit) {
        this.idUpdate = res.idEdit;
        this.getenseigneById();
        
      }
    });
       this.getpointventeByEnseigne()
   //  console.log(JSON.stringify(this.listPvByEnseigne)+"***************************444")
   }
  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }
  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: {  },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
       this.latt = place.geometry.location.lat();
       this.longt = place.geometry.location.lng();
       console.log(typeof(this.latt),"ttttttttttttttttttttttttttttt")
      // this.getAddrComponent(place)
      this.invokeEvent(place);
     this.data.adresse= this.getAddresse(place)
     this.data.lat= this.latt
     this.data.lng= this.longt
    });
  }
  getAddrComponent(place, componentTemplate) {
    let result;
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        
        return result;
      }
    }
    return;
  }
  
 public getAddresse(place: object) {
   // this.address = place['formatted_address'];
    // this.phone = this.getPhone(place);
    this.formattedAddress = place['formatted_address'];
    console.log(typeof(this.formattedAddress,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"))
    console.log(this.formattedAddress,"xxxxxxxxxxxxxxxxxxxxxxxxxx")
   return this.zone.run((res: any) => {
      return this.formattedAddress = place['formatted_address'];
    })
  }
  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }


  
   getenseigneById() {
      this.apiSer.getData('enseignes/' + this.idUpdate).subscribe((res: any) => {
     // console.log(JSON.stringify(res)+'eeeeeeeeeeeeeeeeeeeeeeeeeee')
         this.listPvByEnseigne=res.data.pointvente
         this.IdEnseigne=res.data.id
       res.data.pointvente.forEach(element => {
        this.addressPv = element.startLocation.address
        this.latppppppppv=element.startLocation.coordinates[0]
        this.lngggggggg=element.startLocation.coordinates[1]
        console.log(this.latppppppppv+this.lngggggggg+'??????????????????????????????????????????????????????????????????')
      });
       
      });
   
  }






  

  onEditPoinvtVenteEnseigne(IdPointVente){
     /*     console.log(JSON.stringify(IdPointVente)+'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

       if (IdPointVente.startLocation.coordinates[0]!==null && IdPointVente.startLocation.coordinates[1]!==null) {

      var editconfig ={
        name:IdPointVente.name,
        description:IdPointVente.description,
        startLocation : {coordinates : [IdPointVente.startLocation.coordinates[0], IdPointVente.startLocation.coordinates[1]], 
           address:this.formattedAddress}
      }

      
    this.apiSer.updatePointVenteEnseigne('pointVentes/', editconfig, IdPointVente._id).subscribe(data => {  
      
      Swal.fire({
        title: 'Modification point de vente',
        text: 'point de vente est modifiée avec succès',
        width: 500,
        confirmButtonText: 'OK',
      });  
    }, err => {
      Swal.fire({
        title: 'Modification point de vente',
        text: 'Verifier les données de la point de vente',
        width: 500,
      });
    });

     } else {  */
        var  editconfig1= {
        name:this.data.name,
        description:this.data.description,
        startLocation : {
          coordinates : [this.latt || IdPointVente.startLocation.coordinates[0], this.longt || IdPointVente.startLocation.coordinates[1]],
          address:  this.formattedAddress || IdPointVente.startLocation.address}
    } 

   /*  var  editconfig1= {
      name:this.data.name,
      description:this.data.description,
      startLocation : {coordinates : [this.latt, this.longt],address:  this.formattedAddress}
  } */
    this.apiSer.updatePointVenteEnseigne('pointVentes/', editconfig1, IdPointVente._id).subscribe(data => {  
      
      Swal.fire({
        title: 'Modification point de vente',
        text: 'point de vente est modifiée avec succès',
        width: 500,
        confirmButtonText: 'OK',
      });  
    }, err => {
      Swal.fire({
        title: 'Modification point de vente',
        text: 'Verifier les données de la point de vente',
        width: 500,
      });
    });
    // }
  
   
  }


  
   
      // Get pointvente by enseigne
  public getpointventeByEnseigne() {
        return this.apiSer.getData('pointVentes/listePointVentes/'+this.IdEnseigne).subscribe((res: any) => {

          console.log('+++++++++++++++++++++'+JSON.stringify(res))
    })
}


deleteEnseigne(i: number) {
  console.log(i,"dddddddddd")
//  this.deletePVByIdEnseigne(event)
  this.show--;
  this.enseignes.pointvente.splice(i, 1);
  console.log(this.enseignes.pointvente)
}

   //  For confirm action On Delete
   deletePVByIdEnseigne(event) {
    Swal.fire({
        title: 'êtes vous Sûre?',
        text: "Vous ne pouvez pas restaurer vos données!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmer'
    }).then((result) => {
        if (result.value) {
            return this.apiSer.deletePointVenteById('pointVentes/', event._id).subscribe((res: any) => {
                this.getpointventeByEnseigne();
                
                Swal.fire(
                    'Supprimé!',
                    'L\'opération a été effectuée avec succès!',
                    'success'
                )
              
            }, err => {
                console.log(err);


            })
        }


    })

}



}
