
import create from "./http-service";

export interface Todo {
    id: number,
    order: number,
    isActive: boolean,
    title: string
}


export default create('/events')