import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ApiService } from 'app/shared/services/Api.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-showenseigne',
    templateUrl: './showenseigne.component.html',
    styleUrls: ['./showenseigne.component.scss']
})

export class ShowenseigneComponent implements OnInit {
    enseignes: any = []
    apiUrl: string

    pageSize = 10;
    page: number = 1
    constructor(private apiSer: ApiService,
        private route: Router) {
        this.apiUrl = environment.apiImg
        // console.log(this.apiUrl);
    }

    ngOnInit(): void {
        this.getenseignes()
    }
    public getenseignes() {
        return new Promise(resolve => {

            this.enseignes = []
            // console.log(this.page);

            return this.apiSer.getData('enseignes/allEnseigne').subscribe((res: any) => {
                this.enseignes = res.data
                resolve(this.enseignes)

            })
        })
    }

    testedit (item) {
       console.log( JSON.stringify(item)+"*************")
    }

    // And the listener code which asks the DataSource to filter the data:


    //  For confirm action On Delete
    onDeleteConfirm(event) {
        swal.fire({
            title: 'êtes vous Sûre?',
            text: "Vous ne pouvez pas restaurer vos données!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmer'
        }).then((result) => {
            if (result.value) {
                return this.apiSer.delete('enseignes/', event).subscribe((res: any) => {
                    console.log(res);

                    this.getenseignes();


                    swal.fire(
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

    //  For confirm action On Save
    onSaveConfirm(event) {
        if (window.confirm('Are you sure you want to save?')) {
            event.newData['name'] += ' + added in code';
            event.confirm.resolve(event.newData);
        } else {
            event.confirm.reject();
        }
    }

    //  For confirm action On Create
    onCreateConfirm() {
        // if (window.confirm('Are you sure you want to create?')) {
        //     event.newData['name'] += ' + added in code';
        //     event.confirm.resolve(event.newData);
        // } else {
        //     event.confirm.reject();
        // }
        this.route.navigateByUrl('/responsable/add')
    }
}
