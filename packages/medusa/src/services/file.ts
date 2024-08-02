import { NinjaError } from "ninja-core-utils"
import { EntityManager } from "typeorm"
import { AbstractFileService } from "../interfaces"
import {
  FileServiceGetUploadStreamResult,
  FileServiceUploadResult,
  GetUploadedFileType,
  UploadStreamDescriptorType,
} from "@ninjajs/types"

class DefaultFileService extends AbstractFileService {
  async upload(
    fileData: Express.Multer.File
  ): Promise<FileServiceUploadResult> {
    throw new NinjaError(
      NinjaError.Types.UNEXPECTED_STATE,
      "Please add a file service plugin in order to manipulate files in Ninja"
    )
  }
  async uploadProtected(
    fileData: Express.Multer.File
  ): Promise<FileServiceUploadResult> {
    throw new NinjaError(
      NinjaError.Types.UNEXPECTED_STATE,
      "Please add a file service plugin in order to manipulate files in Ninja"
    )
  }
  async delete(fileData: Record<string, any>): Promise<void> {
    throw new NinjaError(
      NinjaError.Types.UNEXPECTED_STATE,
      "Please add a file service plugin in order to manipulate files in Ninja"
    )
  }
  async getUploadStreamDescriptor(
    fileData: UploadStreamDescriptorType
  ): Promise<FileServiceGetUploadStreamResult> {
    throw new NinjaError(
      NinjaError.Types.UNEXPECTED_STATE,
      "Please add a file service plugin in order to manipulate files in Ninja"
    )
  }
  async getDownloadStream(
    fileData: GetUploadedFileType
  ): Promise<NodeJS.ReadableStream> {
    throw new NinjaError(
      NinjaError.Types.UNEXPECTED_STATE,
      "Please add a file service plugin in order to manipulate files in Ninja"
    )
  }
  async getPresignedDownloadUrl(
    fileData: GetUploadedFileType
  ): Promise<string> {
    throw new NinjaError(
      NinjaError.Types.UNEXPECTED_STATE,
      "Please add a file service plugin in order to manipulate files in Ninja"
    )
  }
  protected manager_: EntityManager
  protected transactionManager_: EntityManager | undefined
}

export default DefaultFileService
