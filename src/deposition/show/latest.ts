import { deposition_show_details } from './details'
import { helpers_validate_in_collection_value } from '../../helpers/validate-in-collection-value'


export const deposition_show_latest = async (sandbox: boolean, collection_id: string, verbose = false): Promise<string> => {
    await helpers_validate_in_collection_value(sandbox, collection_id, verbose)
    const id = (parseInt(collection_id) + 1).toString()
    const deposition = await deposition_show_details(sandbox, id, verbose)
    let latest_draft_id: string
    if ('latest_draft' in deposition.links && deposition.links.latest_draft !== undefined) {
        latest_draft_id = deposition.links.latest_draft.split('/').slice(-1)[0]
    } else {
        latest_draft_id = ''
    }
    return latest_draft_id
}
