import { Schema, model } from "mongoose";
const serviceSchema = new Schema(
  {
    service_name: {
      type: "string",
      required: "service_name  is required",
    },
    service_type: {
      type: "string",
      required: "service_type is required",
    },
    cost: {
        type: "number",
        required: "cost is required",
      },
    description: {
      type: "string",
      required: "description is required",
    },
    image_path: {
      type: "string",
      required: "image_path filed is required",
    },

    // user_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   required: "user id is required",
    // },

  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
    versionKey: false,
  }
);

const Service = model("Service", serviceSchema);
export default Service;
