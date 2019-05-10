export abstract class ControllerTemplate {
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
}
