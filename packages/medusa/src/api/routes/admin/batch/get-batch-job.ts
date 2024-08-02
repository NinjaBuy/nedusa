/**
 * @oas [get] /admin/batch-jobs/{id}
 * operationId: "GetBatchJobsBatchJob"
 * summary: "Get a Batch Job"
 * description: "Retrieve the details of a batch job."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Batch Job
 * x-codegen:
 *   method: retrieve
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.batchJobs.retrieve(batchJobId)
 *       .then(({ batch_job }) => {
 *         console.log(batch_job.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminBatchJob } from "ninja-react"
 *
 *       type Props = {
 *         batchJobId: string
 *       }
 *
 *       const BatchJob = ({ batchJobId }: Props) => {
 *         const { batch_job, isLoading } = useAdminBatchJob(batchJobId)
 *
 *         return (
 *           <div>
 *             {isLoading && <span>Loading...</span>}
 *             {batch_job && <span>{batch_job.created_by}</span>}
 *           </div>
 *         )
 *       }
 *
 *       export default BatchJob
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl '{backend_url}/admin/batch-jobs/{id}' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Batch Jobs
 * responses:
 *  "200":
 *    description: OK
 *    content:
 *      application/json:
 *        schema:
 *          $ref: "#/components/schemas/AdminBatchJobRes"
 *  "400":
 *    $ref: "#/components/responses/400_error"
 *  "401":
 *    $ref: "#/components/responses/unauthorized"
 *  "404":
 *    $ref: "#/components/responses/not_found_error"
 *  "409":
 *    $ref: "#/components/responses/invalid_state_error"
 *  "422":
 *    $ref: "#/components/responses/invalid_request_error"
 *  "500":
 *    $ref: "#/components/responses/500_error"
 */
export default async (req, res) => {
  const batch_job = req.batch_job
  res.status(200).json({ batch_job: batch_job })
}
