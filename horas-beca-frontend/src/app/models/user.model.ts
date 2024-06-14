export class User{
    constructor(
        public _id: string,
        public name: string,
        public lastname: string,
        public email: string,
        public role: string,
        public password: string,
        public hours: string
    ){}
}