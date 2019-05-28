import {Console, Injectable} from 'tsunamy/core';
import {ResponseEntity} from '../core/interface/responseEntity';
import {IRequest} from '../mongo/schema/interface/iRequest';
import {IRequestModel, RequestTeam} from '../mongo/schema/request-team';

@Injectable()
export class RequestService {
    private request: IRequestModel;

    constructor() {
        this.request = new RequestTeam();
    }

    async askToJoin(request: IRequest): Promise<ResponseEntity> {
        // check if user already exist
        Console.Info('Check if request already exist');
        const isPresent = await this.request.askToJoin(request);

        if (isPresent) {
            Console.Err('User already exist');
            return {error: 409};
        }

        await RequestTeam.create(request).then((res: IRequestModel) => {
            Console.Info('Request created : ' + res._id + ' : ' + res.date);
        }).catch(reason => {
            Console.Err(reason);
        });
        return {code: 201};
    }

    async getRequestByIdUser(idUser: any): Promise<ResponseEntity> {
        const requestsByIdUser = await RequestTeam.find({idUser}, function(err, res) {
            if (err) {
                Console.Err('Requests not found : ' + idUser);
            }

            return res;
        });

        return requestsByIdUser === undefined ? {error: 404} : {code: 200, value: requestsByIdUser};
    }

    async getRequestByIdTeam(idTeam: any): Promise<ResponseEntity> {
        const requestsByIdTeam = await RequestTeam.find({idTeam}, function(err: any, res: any[]) {
            if (err) {
                Console.Err('Requests not found : ' + idTeam);
            }
            return res;
        });

        return requestsByIdTeam === undefined ? {error: 404} : {code: 200, value: requestsByIdTeam};
    }

    async delete(id: string): Promise<ResponseEntity> {
        const deleted: any = await RequestTeam.deleteOne({_id: id}, function(err: any) {
            if (err) {
                Console.Err('Request not found : ' + id);
            }
        });

        return deleted.ok === 1 ? {code: 202} : {code: 500};
    }
}
