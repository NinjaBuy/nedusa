import {
  AdminDeleteUploadsReq,
  AdminDeleteUploadsRes,
  AdminPostUploadsDownloadUrlReq,
  AdminUploadsDownloadUrlRes,
  AdminUploadsRes,
} from "@ninjajs/ninja"
import { AdminCreateUploadPayload, ResponsePromise } from "../../typings"
import BaseResource from "../base"

/**
 * This class is used to send requests to [Admin Upload API Routes](https://docs.ninjajs.com/api/admin#uploads). All its method
 * are available in the JS Client under the `ninja.admin.uploads` property.
 * 
 * All methods in this class require {@link AdminAuthResource.createSession | user authentication}.
 * 
 * The methods in this class are used to upload any type of resources. For example, they can be used to upload CSV files that are used to import products into the store.
 * 
 * Related Guide: [How to upload CSV file when importing a product](https://docs.ninjajs.com/modules/products/admin/import-products#1-upload-csv-file).
 */
class AdminUploadsResource extends BaseResource {
  /**
   * @ignore
   * @privateRemarks No need to include this in the generated documentation.
   */
  private headers = {
    "Content-Type": "multipart/form-data",
  }

  /**
   * Upload a file or multiple files to a public bucket or storage. The file upload is handled by the file service installed on the Ninja backend.
   * @param {AdminCreateUploadPayload} file - The file(s) to upload.
   * @returns {ResponsePromise<AdminUploadsRes>} Resolves to the uploaded file details.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.uploads.create(file)
   * .then(({ uploads }) => {
   *   console.log(uploads.length);
   * })
   */
  create(file: AdminCreateUploadPayload): ResponsePromise<AdminUploadsRes> {
    const path = `/admin/uploads`

    const payload = this._createPayload(file)

    return this.client.request("POST", path, payload, {}, this.headers)
  }

  /**
   * Upload a file to an ACL or a non-public bucket. The file upload is handled by the file service installed on the Ninja backend.
   * @param {AdminCreateUploadPayload} file - The file to upload.
   * @returns {ResponsePromise<AdminUploadsRes>} Resolves to the uploaded file details.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.uploads.createProtected(file)
   * .then(({ uploads }) => {
   *   console.log(uploads.length);
   * })
   */
  createProtected(
    file: AdminCreateUploadPayload
  ): ResponsePromise<AdminUploadsRes> {
    const path = `/admin/uploads/protected`

    const payload = this._createPayload(file)

    return this.client.request("POST", path, payload, {}, this.headers)
  }

  /**
   * Delete an uploaded file from storage. The file is deleted using the installed file service on the Ninja backend.
   * @param {AdminDeleteUploadsReq} payload - The uploaded file to delete.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminDeleteUploadsRes>} Resolves to the deletion operation's details.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.uploads.delete({
   *   file_key
   * })
   * .then(({ id, object, deleted }) => {
   *   console.log(id);
   * })
   */
  delete(
    payload: AdminDeleteUploadsReq,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminDeleteUploadsRes> {
    const path = `/admin/uploads`

    return this.client.request("DELETE", path, payload, {}, customHeaders)
  }

  /**
   * Create and retrieve a presigned or public download URL for a file. The URL creation is handled by the file service installed on the Ninja backend.
   * @param {AdminPostUploadsDownloadUrlReq} payload - The uploaded file to get a presigned download URL for.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminUploadsDownloadUrlRes>} Resolves to the download URL details.
   * 
   * @example
   * import Ninja from "@ninjajs/ninja-js"
   * const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * ninja.admin.uploads.getPresignedDownloadUrl({
   *   file_key
   * })
   * .then(({ download_url }) => {
   *   console.log(download_url);
   * })
   */
  getPresignedDownloadUrl(
    payload: AdminPostUploadsDownloadUrlReq,
    customHeaders: Record<string, any> = {}
  ): ResponsePromise<AdminUploadsDownloadUrlRes> {
    const path = `/admin/uploads/download-url`

    return this.client.request("POST", path, payload, {}, customHeaders)
  }

  private _createPayload(file: AdminCreateUploadPayload) {
    const payload = new FormData()

    if (Array.isArray(file)) {
      file.forEach((f) => payload.append("files", f))
    } else {
      payload.append("files", file)
    }

    return payload
  }
}

export default AdminUploadsResource
