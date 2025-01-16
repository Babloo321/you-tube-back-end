import { Router } from "express";
import { 
  loginUser, 
  registerUser, 
  logoutUser,
  refreshAccessTokenGenerator,
  changeCurrentPassword ,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage
 
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name:"avatar",  // for frontend user name of the avtar_image should be avatar
      maxCount:1
    },
    {
      name:"coverImage",
      maxCount:1
    }
  ]),
  registerUser);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
// router.route("/refresh-token").post(refreshAccessTokenGenerator)
router.route("/password-change").post(verifyJWT,changeCurrentPassword);
router.route("/current-user").get(verifyJWT,getCurrentUser);
router.route("/update-account").post(verifyJWT,updateAccountDetails)
router.route("/update-avatar").post(verifyJWT,upload.single("avatar"),updateUserAvatar);
router.route("/update-cover-image").post(verifyJWT,upload.single("coverImage"),updateUserCoverImage);
export default router;


