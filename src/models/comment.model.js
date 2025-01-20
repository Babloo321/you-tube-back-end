import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const commentSchma = new mongoose.Schema({
  content:{
    type:String,
    require:true
  },
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  video:{
    type:Schema.Types.ObjectId,
    ref:"Video",
    required:true
  },
},{timestamps:true});

commentSchma.plugin(mongooseAggregatePaginate);
const Comment = mongoose.model("Comment",commentSchma);
export default commentSchma;