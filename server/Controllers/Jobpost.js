const job = require("../Models/Jobpost")
const user = require("../Models/user")

// const { uploadImageToCloudinary } = require("../utils/imageUploader")
// const { convertSecondsToDuration } = require("../utils/secToDuration")
// Function to create a new course
exports.createjob = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id
    // Get all required fields from request body
    let {
      companyName,
      companyDescription,
      jobTitle,
      jobDescription,
      location,
      role,
      experience,
      salary,
      skills
    } = req.body
    // Get thumbnail image from request files
    // const thumbnail = req.files.thumbnailImage

    // Convert the tag and instructions from stringified Array to Array
    // const tag = JSON.parse(_tag)
    // const instructions = JSON.parse(_instructions)

    // console.log("tag", tag)
    // console.log("instructions", instructions)

    // Check if any of the required fields are missing
    if (
      !companyName||
      !companyDescription||
      !jobTitle||
      !jobDescription||
      !location||
      !role||
      !experience||
      !salary||
      !skills
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    // Check if the user is an instructor
    const jobposterDetails = await user.findById(userId)

    if (!jobposterDetails) {
      return res.status(404).json({
        success: false,
        message: "Jobposter Details Not Found",
      })
    }

    // Check if the tag given is valid
    // const categoryDetails = await Category.findById(category)
    // if (!categoryDetails) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Category Details Not Found",
    //   })
    // }
    // Upload the Thumbnail to Cloudinary
    // const thumbnailImage = await uploadImageToCloudinary(
    //   thumbnail,
    //   process.env.FOLDER_NAME
    // )
    // console.log(thumbnailImage)
    // Create a new course with the given details
    const newJob = await job.create({
      user: jobposterDetails._id,
      companyName,
      companyDescription,
      jobTitle,
      jobDescription,
      location,
      role,
      experience,
      salary,
      skills
    })

    // Add the new course to the User Schema of the Instructor
    await user.findByIdAndUpdate(
      {
        _id: jobposterDetails._id,
      },
      {
        $push: {
          jobs: newJob._id,
        },
      },
      { new: true }
    )
    res.status(200).json({
      success: true,
      data: newJob,
      message: "job posted  Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create job",
      error: error.message,
    })
  }
}
// Edit Course Details
exports.editjob = async (req, res) => {
  try {
    const { jobid } = req.body
    const updates = req.body
    const job = await job.findById(jobid)

    if (!job) {
      return res.status(404).json({ error: "job not found" })
    }

    // // If Thumbnail Image is found, update it
    // if (req.files) {
    //   console.log("thumbnail update")
    //   const thumbnail = req.files.thumbnailImage
    //   const thumbnailImage = await uploadImageToCloudinary(
    //     thumbnail,
    //     process.env.FOLDER_NAME
    //   )
    //   course.thumbnail = thumbnailImage.secure_url
    // }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await job.save()

    const updatedjob = await Course.findOne({
      _id: jobid,
    })
      .populate("Jobposter")
      .populate("category")
      .exec()

    res.json({
      success: true,
      message: "job updated successfully",
      data: updatedjob,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
// // Get Course List
// exports.getAllCourses = async (req, res) => {
//   try {
//     const allCourses = await Course.find(
//       { status: "Published" },
//       {
//         courseName: true,
//         price: true,
//         thumbnail: true,
//         instructor: true,
//         ratingAndReviews: true,
//         studentsEnrolled: true,
//       }
//     )
//       .populate("instructor")
//       .exec()

//     return res.status(200).json({
//       success: true,
//       data: allCourses,
//     })
//   } catch (error) {
//     console.log(error)
//     return res.status(404).json({
//       success: false,
//       message: `Can't Fetch Course Data`,
//       error: error.message,
//     })
//   }
// }
// // Get One Single Course Details
// // exports.getCourseDetails = async (req, res) => {
// //   try {
// //     const { courseId } = req.body
// //     const courseDetails = await Course.findOne({
// //       _id: courseId,
// //     })
// //       .populate({
// //         path: "instructor",
// //         populate: {
// //           path: "additionalDetails",
// //         },
// //       })
// //       .populate("category")
// //       .populate("ratingAndReviews")
// //       .populate({
// //         path: "courseContent",
// //         populate: {
// //           path: "subSection",
// //         },
// //       })
// //       .exec()
// //     // console.log(
// //     //   "###################################### course details : ",
// //     //   courseDetails,
// //     //   courseId
// //     // );
// //     if (!courseDetails || !courseDetails.length) {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Could not find course with id: ${courseId}`,
// //       })
// //     }

// //     if (courseDetails.status === "Draft") {
// //       return res.status(403).json({
// //         success: false,
// //         message: `Accessing a draft course is forbidden`,
// //       })
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       data: courseDetails,
// //     })
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     })
// //   }
// // }
// exports.getCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const courseDetails = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//           select: "-videoUrl",
//         },
//       })
//       .exec()

//     if (!courseDetails) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find course with id: ${courseId}`,
//       })
//     }

//     // if (courseDetails.status === "Draft") {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: `Accessing a draft course is forbidden`,
//     //   });
//     // }

//     let totalDurationInSeconds = 0
//     courseDetails.courseContent.forEach((content) => {
//       content.subSection.forEach((subSection) => {
//         const timeDurationInSeconds = parseInt(subSection.timeDuration)
//         totalDurationInSeconds += timeDurationInSeconds
//       })
//     })

//     const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

//     return res.status(200).json({
//       success: true,
//       data: {
//         courseDetails,
//         totalDuration,
//       },
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }
// exports.getFullCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const userId = req.user.id
//     const courseDetails = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()

//     // if (courseDetails.status === "Draft") {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: `Accessing a draft course is forbidden`,
//     //   });
//     // }


// // Get a list of Course for a given Instructor
// exports.getInstructorCourses = async (req, res) => {
//   try {
//     // Get the instructor ID from the authenticated user or request body
//     const instructorId = req.user.id

//     // Find all courses belonging to the instructor
//     const instructorCourses = await Course.find({
//       instructor: instructorId,
//     }).sort({ createdAt: -1 })

//     // Return the instructor's courses
//     res.status(200).json({
//       success: true,
//       data: instructorCourses,
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve instructor courses",
//       error: error.message,
//     })
//   }
// }
// // Delete the Course
// exports.deleteCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body

//     // Find the course
//     const course = await Course.findById(courseId)
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" })
//     }

//     // Unenroll students from the course
//     const studentsEnrolled = course.studentsEnroled
//     for (const studentId of studentsEnrolled) {
//       await User.findByIdAndUpdate(studentId, {
//         $pull: { courses: courseId },
//       })
//     }

//     // Delete sections and sub-sections
//     const courseSections = course.courseContent
//     for (const sectionId of courseSections) {
//       // Delete sub-sections of the section
//       const section = await Section.findById(sectionId)
//       if (section) {
//         const subSections = section.subSection
//         for (const subSectionId of subSections) {
//           await SubSection.findByIdAndDelete(subSectionId)
//         }
//       }

//       // Delete the section
//       await Section.findByIdAndDelete(sectionId)
//     }

//     // Delete the course
//     await Course.findByIdAndDelete(courseId)

//     return res.status(200).json({
//       success: true,
//       message: "Course deleted successfully",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     })
//   }
// }
