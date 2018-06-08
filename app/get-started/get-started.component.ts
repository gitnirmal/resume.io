import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'get-started-app',
    templateUrl: './get-started.component.html',
    styleUrls: ['./get-started.component.css']
})

export class GetStartedComponent implements OnInit {

    isProfile: boolean;

    constructor() { }

    ngOnInit() {
        this.isProfile = false;
    }

    checkProfileData(data) {
        this.isProfile = data;
    }
}