import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IHospital } from 'app/shared/model/hospital.model';
import { HospitalService } from './hospital.service';

@Component({
    selector: 'jhi-hospital-update',
    templateUrl: './hospital-update.component.html'
})
export class HospitalUpdateComponent implements OnInit {
    hospital: IHospital;
    isSaving: boolean;

    constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hospital }) => {
            this.hospital = hospital;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.hospital.id !== undefined) {
            this.subscribeToSaveResponse(this.hospitalService.update(this.hospital));
        } else {
            this.subscribeToSaveResponse(this.hospitalService.create(this.hospital));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHospital>>) {
        result.subscribe((res: HttpResponse<IHospital>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
