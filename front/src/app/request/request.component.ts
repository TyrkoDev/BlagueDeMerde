import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RequestService} from '../shared/request/request.service';
import {TeamService} from '../shared/team/team.service';
import {ResponseEntity} from '../shared/model/entity/response-entity';
import {TeamEntity} from '../shared/model/entity/team-entity';
import {AuthenticateService} from '../shared/authenticate/authenticate.service';
import {UserEntity} from '../shared/model/entity/user-entity';
import {ToastrService} from 'ngx-toastr';
import {RequestTeam} from '../shared/model/interface/request-interface';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{
    teams: TeamEntity[] = [];
    teamsFilter: TeamEntity[] = [];
    user: UserEntity;

    constructor(private requestService: RequestService,
                private teamService: TeamService,
                private authenticateService: AuthenticateService,
                private toastr: ToastrService) {
        this.user = this.authenticateService.getCurrentUser();
    }

    ngOnInit(): void {
        this.teamService.getEveryTeam().subscribe((teams: ResponseEntity<TeamEntity[]>) => {
            this.teams = teams.value.filter(team => this.user.team.indexOf(team._id) === -1);
            this.teamsFilter = this.teams;
        });
    }

    filter(event: any) {
        this.teamsFilter = this.teams.filter(team => team.name.indexOf(event.target.value) !== -1);
    }

    join(id: string): void {
        const request: RequestTeam = {
            idTeam: id,
            idUser: this.user.id,
            date: new Date()
        };

        this.requestService.askToJoin(request).subscribe((response: ResponseEntity<any>) => {
                if (response.code === 201) {
                    this.toastr.success('Votre demande a bien été prise en compte!', 'Request');
                }
            },
            (error) => {
                if (error.code === 409) {
                    this.toastr.warning('Votre demande a déjà été prise en compte', 'Request');
                } else {
                    this.toastr.error('Une erreur est survenue ...', 'Request');
                }
            });
    }
}
