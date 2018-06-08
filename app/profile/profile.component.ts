import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { IProfile } from './profile.interface';

@Component({
    selector: 'profile-block',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    profileForm: FormGroup;
    profileValues: boolean = false;
    profile: IProfile;
    modalRef: NgbModalRef;
    @Output() profileData: EventEmitter<any> = new EventEmitter();

    constructor(private _formBuilder: FormBuilder, private _modalService: NgbModal) { }

    ngOnInit() {
        this.profile = {
            name: null,
            email: null,
            primaryPhone: null,
            secondaryPhone: null,
            address: {
                city: null,
                state: null,
                zipCode: null
            },
            headline: null,
            summary: null
        };
        this.profileFormValidation();
    }

    profileFormValidation() {
        this.profileForm = this._formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(3)]],
            email: [null, [Validators.required, Validators.email]],
            primaryPhone: [null, [Validators.required]],
            secondaryPhone: [null],
            address: this._formBuilder.group({
                city: [null, [Validators.required]],
                state: [null, [Validators.required]],
                zipCode: [null, [Validators.required]]
            }),
            headline: [null, [Validators.required]],
            summary: [null, [Validators.required, Validators.minLength(100)]],
        });
    }

    open(content) {
        this.profileForm.setValue({
            name: this.profile.name,
            email: this.profile.email,
            primaryPhone: this.profile.primaryPhone,
            secondaryPhone: this.profile.secondaryPhone,
            address: {
                city: this.profile.address.city,
                state: this.profile.address.state,
                zipCode: this.profile.address.zipCode
            },
            headline: this.profile.headline,
            summary: this.profile.summary
        });
        this.modalRef = this._modalService.open(content, { size: 'lg' });
        this.modalRef.result.then((result) => {
            this.profileForm.reset();
        }, (reason) => {
            this.profileForm.reset();
        });
    }

    postData() {
        this.profileData.emit(true);
        this.profileValues = true;
        this.profile = this.profileForm.value;
        this.modalRef.close();
    }

}