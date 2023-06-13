import apiService from "./api-service";

interface entity {
    id: number,
    order: number,
    completed: boolean,
    title: string
}

class HttpService {
    endPoint: string;
    constructor(enpoint: string) {
        this.endPoint = enpoint
    }
    getAll<T>() {
        return apiService.get<T[]>(this.endPoint)
    }
    delete(id: number) {
        return apiService.delete(this.endPoint + '/' + id)
    }
    add<T>(entity: T) {
        return apiService.post(this.endPoint, entity)
    }
    update<T extends entity>(entity: T) {
        return apiService.put(this.endPoint + entity.id, entity)
    }
}
const create = (enpoit: string) => new HttpService(enpoit);
export default create;