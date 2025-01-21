import mongoose, {isValidObjectId} from "mongoose"
import Comment from "../models/comment.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import { contextsKey } from "express-validator/lib/base.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    if(isValidObjectId(videoId)){
        throw new ApiError(400, "Invalid Video Id")
    }

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const { content } = req.body
    if(!content){
        throw new ApiError(400, "Content is required")
    }
    const comment = await Comment.create({content})
    if(!comment){
        throw new ApiError(500, "Something went wrong while creating comment")
    }

    console.log("Comment created successfully");
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            comment,
            "Comment created successfully"
        )
    )
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    let {commentId} = req.params
    commentId = new mongoose.Types.ObjectId(commentId)
    const {content} = req.body
    if(!(commentId || content)){
        throw new ApiError(400, "All fields are required")
    }
    const comment = await Comment.findByIdAndUpdate(commentId, {content}, {new: true})
    if(!comment){
        throw new ApiError(500, "Something went wrong while updating comment")
    }
    console.log("Comment updated successfully");
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            comment,
            "Comment updated successfully"
        )
    )
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    let {commentId} = req.params
    commentId = new mongoose.Types.ObjectId(commentId)
    const comment = await Comment.findByIdAndDelete(commentId)
    if(!comment){
        throw new ApiError(500, "Something went wrong while deleting comment")
    }
    console.log("Comment deleted successfully");
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Comment deleted successfully"
        )
    )
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }