
import create from "./http-service";

export interface Todo {
    id: number,
    order: number,
    completed: boolean,
    title: string
}


export default create('/events')