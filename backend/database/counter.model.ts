import { Document, Schema, model, models } from "mongoose";


interface ICounter extends Document  {
    key : string,
    seq : number
}


const CounterSchema = new Schema<ICounter> ({
    key :{
        type: String,
        required : true,
        unique :true
    },
    seq : {
        type : Number ,
        default : 0
    }
})

const Counter = models.Counter || model('Counter',CounterSchema )
export default Counter