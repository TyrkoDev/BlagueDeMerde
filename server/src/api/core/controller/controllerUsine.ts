import {InterfaceDTO} from '../interface/InterfaceDTO';

export abstract class ControllerUsine {
    private serviceDefinition: any;

    protected constructor(serviceDefinition: any) {
        this.serviceDefinition = serviceDefinition;
    }

    hi(): any {
        return {
            controller: this.serviceDefinition.name,
            methods: Object.getOwnPropertyNames(this.serviceDefinition.prototype)
        };
    }

    abstract create(dto: InterfaceDTO): void;
    abstract update(dto: InterfaceDTO): void;
    abstract delete(id: string): void;
}
