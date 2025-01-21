import mongoose, {isValidObjectId} from "mongoose"
import Video from "../models/video.model.js"
import User from "../models/user.model.js"
import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinay.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    console.log(`
        page:${page},
        limit:${limit}, 
        query:${query}, 
        sortBy:${sortBy}, 
        sortType:${sortType}, 
        userId:${userId}
    `)
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {page,limit,query,sortBy,sortType,userId},
            "Videos fetched successfully"
        )
    )
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
    if (
        [title, description].some(field => field?.trim() === "")
      ) {
        throw new ApiError(400, "All fields are required");
      }

    const existsVideo = await Video.findOne({title});
    if(existsVideo){
        throw new ApiError(400, "Video already exists");
    }

    
    // getting video file which is coming from client side after using multi req.files accessible 
    const videoFileLocalImage = req.files?.videoFile[0]?.path;
    const thumbnailLocalImage = req.files?.thumbnail[0]?.path;

    if(!(videoFileLocalImage || thumbnailLocalImage)){
        throw new ApiError(400, "Video or thumbnail is required");
    }

    const videoFile = await uploadOnCloudinary(videoFileLocalImage);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalImage);

    if(!(videoFile || thumbnail)){
        throw new ApiError(500, "Error on Cloudinary plateform");
    }
    const videoFilePublicId = videoFile?.public_id;
    const thumbnailPublicId = thumbnail?.public_id;
    const video = await Video.create({
        videoFile: videoFile.url,
        thumbnail:thumbnail.url,
        videoFileId:videoFilePublicId,
        thumbnailId:thumbnailPublicId,
        title,
        description,

})
    const createdVideo = await Video.findById(video._id).select("-owner -videoFileId -thumbnailId");
    if(!createdVideo){
        throw new ApiError(500, "Something went wrong while creating video");
    }
    console.log("Video upload successfully");
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            createdVideo,
            "Video upload successfully"
        )
    )

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    // first videoId verify karenge
    // than find video in database and than send to the user
    const _id = new mongoose.Schema.Types.ObjectId(videoId);
    if(isValidObjectId(_id)){
        throw new ApiError(400, "Invalid Video Id");
    }

    const video = await Video.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(req.params?.videoId)
            }
        },
        {
            $project:{
                videoFile:1,
                thumbnail:1,
                title:1,
                description:1,
                _id:0
            }
        }
    ])
    if(!video){
        throw new ApiError(400, "Video not exists")
    }

    console.log(video)
    console.log("Video found");
    return res
    .status(200)
    .json(
        new ApiResponse (200,
       video,
        "Video fetched successfully"
        )
    )
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}