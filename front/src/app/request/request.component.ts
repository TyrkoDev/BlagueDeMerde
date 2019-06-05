import {Component, OnInit} from '@angular/core';
import {RequestService} from '../shared/request/request.service';
import {TeamService} from '../shared/team/team.service';
import {ResponseEntity} from '../shared/model/entity/response-entity';
import {TeamEntity} from '../shared/model/entity/team-entity';
import {AuthenticateService} from '../shared/authenticate/authenticate.service';
import {UserEntity} from '../shared/model/entity/user-entity';
import {ToastrService} from 'ngx-toastr';
import {RequestTeam} from '../shared/model/interface/request-interface';
import {HttpErrorResponse} from '@angular/common/http';
import {RequestEntity} from '../shared/model/entity/request-entity';
import {RequestClass} from '../shared/model/class/request-class';
import {UserService} from '../shared/user/user.service';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
    teams: TeamEntity[] = [];
    teamsFilter: TeamEntity[] = [];
    user: UserEntity;
    requests: RequestClass[] = [];

    constructor(private requestService: RequestService,
                private userService: UserService,
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

        this.requestService.getRequestByIdUser(this.user._id)
            .subscribe((requestsResponses: ResponseEntity<RequestEntity[]>) => {
                    requestsResponses.value.map((requestEntity: RequestEntity) => {
                        this.userService.getUser(requestEntity.idUser).subscribe((userEntity: ResponseEntity<UserEntity>) => {
                            this.teamService.getTeam(requestEntity.idTeam).subscribe((teamEntity: ResponseEntity<TeamEntity>) => {
                                this.requests.push(new RequestClass(userEntity.value, teamEntity.value, requestEntity._id));
                            });
                        });
                    });
                }, error => console.error('Something went wrong ... ', error)
        );
    }

    filter(event: any) {
        this.teamsFilter = this.teams.filter(team => team.name.indexOf(event.target.value) !== -1);
    }

    join(idRequest: string, idTeam: string, idUser: string): void {
        this.teamService.becomeTeamMember(idTeam, idUser)
            .subscribe(() => this.requestService.deleteRequestById(idRequest).subscribe(),
            () => this.toastr.error('Something went wrong :(', 'Join')
        );
    }

    askToJoin(id: string): void {
        const request: RequestTeam = {
            idTeam: id,
            idUser: this.user._id,
            date: new Date()
        };

        this.requestService.askToJoin(request).subscribe(() => {
                this.toastr.success('Votre demande a bien été prise en compte.', 'Request');
            },
            (error: HttpErrorResponse) => {
                if (error.status === 409) {
                    this.toastr.warning('Votre demande a déjà été prise en compte.', 'Request');
                } else {
                    this.toastr.error('Une erreur est survenue, veuillez réessayer plus tard.', 'Request');
                }
            });
    }
}
