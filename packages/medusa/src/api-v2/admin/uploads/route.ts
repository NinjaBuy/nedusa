import { uploadFilesWorkflow } from "@ninjajs/core-flows"
import { CreateProductDTO } from "@ninjajs/types"
import {
  AuthenticatedNinjaRequest,
  NinjaResponse,
} from "../../../types/routing"
import { NinjaError } from "@ninjajs/utils"

export const POST = async (
  req: AuthenticatedNinjaRequest<CreateProductDTO>,
  res: NinjaResponse
) => {
  const input = req.files as Express.Multer.File[]

  if (!input?.length) {
    throw new NinjaError(
      NinjaError.Types.INVALID_DATA,
      "No files were uploaded"
    )
  }

  const { result, errors } = await uploadFilesWorkflow(req.scope).run({
    input: {
      files: input?.map((f) => ({
        filename: f.originalname,
        mimeType: f.mimetype,
        content: f.buffer.toString("binary"),
      })),
    },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  res.status(200).json({ files: result })
}
