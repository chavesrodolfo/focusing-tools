import {Injectable} from 'angular2/angular2';

@Injectable()
export class DataService {
    data: {
        milestones: Array<any>,
        slimMilestones: Array<any>,
    };

    constructor() {
        this.data = {
            milestones: [],
            slimMilestones: []
        };
    }

    loadMilestones() {
        // return window.fetch('https://api.github.com/repos/angular/angular/milestones')
        //     .then(this._status)
        //     .then(this._json)
        //     .then(d => {
        //         this.data.milestones = d;
        //         this._updateSlimMilestones();
        //     }).catch(error => console.log('Request failed', error));
    }
}