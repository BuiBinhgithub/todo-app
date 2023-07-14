
import create from "./http-service";

export interface Todo {
    isActive: any;
    id: number,
    order: number,
    completed: boolean,
    title: string
}


export default create('/events')