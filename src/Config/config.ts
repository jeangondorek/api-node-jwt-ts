const env: string = process.env.NODE_ENV || 'dev';

const config = (): { bd_string: string, jwt_pass: string, jwt_expires: string } =>{
    switch (env){
        case 'dev':
        return{
            bd_string: "mongodb+srv://jeancanova:jeancanova@cluster0.l2ag0e5.mongodb.net/",
            jwt_pass: "123",
            jwt_expires: "7d"
        }
        default:
        return{
            bd_string: "",
            jwt_pass: "",
            jwt_expires: ""
        }
    }
}

console.log(`iniciado api em ambiente ${env.toUpperCase()}`);

export default config();
