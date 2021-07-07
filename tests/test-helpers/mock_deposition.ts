import { DepositionsResponse } from '../../src/helpers/zenodo-response-types'

interface NamedParameters {
    conceptrecid?: string | undefined
    record_id?: string | undefined
    prereserve_doi?: string | undefined
    latest_id?: string | undefined
    latest_draft?: string | undefined
}


export const mock_deposition = ({conceptrecid=undefined,
                                 record_id=undefined,
                                 prereserve_doi=undefined,
                                 latest_id=undefined,
                                 latest_draft=undefined}: NamedParameters): DepositionsResponse => {
    return  {
            conceptrecid: conceptrecid,
            files: [
                {
                    filename: undefined
                }
            ],
            links: {
                bucket: undefined,
                latest: latest_id,
                latest_draft: latest_draft
            },
            metadata: {
                prereserve_doi: {
                    doi: prereserve_doi
                }
            },
            record_id
        }
}
