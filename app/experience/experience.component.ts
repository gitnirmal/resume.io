import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { IMyDpOptions } from 'mydatepicker';

import { IExperience } from './experience.interface';

import { DateValidators } from '../date-range.validator';

@Component({
    selector: 'experience-block',
    templateUrl: './experience.component.html'
})

export class ExperienceComponent implements OnInit {

    experienceForm: FormGroup;
    experience: IExperience;
    experienceList: IExperience[];
    modalRef: NgbModalRef;
    recentOne: boolean = false;
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'm/d/yyyy'
    };
    @ViewChild('experienceContent') experienceContent: TemplateRef<any>;

    constructor(private _formBuilder: FormBuilder, private _modalService: NgbModal) { }

    ngOnInit() {
        this.experience = {
            id: null,
            designation: 'Sr. Software Engineer',
            companyName: 'Capgemini',
            location: 'Pune, India',
            startDate: null,
            endDate: null,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
        };
        this.experienceFormValidation();
        this.experienceList = [];
    }

    checkRecentOne(event) {
        this.recentOne = event.target.checked;
        if (!this.recentOne) {
            this.experienceForm.patchValue({
                endDate: null
            });
        } else {
            this.experienceForm.patchValue({
                endDate: 'Recent one'
            });
        }
    }

    experienceFormValidation() {
        this.experienceForm = this._formBuilder.group({
            id: [null],
            designation: ['Sr. Software Developer', [Validators.required]],
            companyName: ['Capgemini', [Validators.required]],
            location: ['Pune, India', [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null],
            description: ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.']
        }, {
                validator: Validators.compose([
                    DateValidators.dateLessThan('startDate', 'endDate', { 'startDateError': true }),
                    DateValidators.dateGreaterThan('endDate', 'startDate', { 'endDateError': true })
                ])
            });
    }

    open(content, params) {
        if (typeof params.action !== 'undefined' && params.action === 'edit' && typeof params.index !== 'undefined' && params.index !== null) {
            this.experienceForm.setValue({
                id: params.index,
                designation: this.experience.designation,
                companyName: this.experience.companyName,
                location: this.experience.location,
                startDate: this.experience.startDate,
                endDate: this.experience.endDate,
                description: this.experience.description
            });
        }
        this.modalRef = this._modalService.open(content, { size: 'lg' });
        this.modalRef.result.then((result) => {
            this.experienceForm.reset();
        }, (reason) => {
            this.experienceForm.reset();
        })
    }

    postData() {
        if (this.experienceForm.value.id !== null) {
            //perform editoperation
            this.experienceList[this.experienceForm.value.id] = this.experienceForm.value;
        } else {
            //perform add operation
            this.experienceList.push(this.experienceForm.value);
        }
        this.modalRef.close();
    }

    editData(index: number) {
        this.experience = this.experienceList[index];
        this.open(this.experienceContent, { action: 'edit', index });
    }

    deleteData(index: number) {
        var result = window.confirm("Are you sure?");
        if (result) {
            this.experienceList.splice(index, 1);
            return true;
        }
        return false;
    }

}