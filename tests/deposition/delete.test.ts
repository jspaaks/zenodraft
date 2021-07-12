import { afterAll, afterEach, describe, test } from '@jest/globals'
import { deposition_delete } from '../../src/deposition/delete'
import { helpers_get_access_token_from_environment } from '../../src/helpers/get-access-token-from-environment'
import * as nock from 'nock'
import { define_token, get_mocked_data } from '../test-helpers'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition delete', () => {

    test('deletes deposition with id \'101\'.', async () => {
        const sandbox = true
        define_token(sandbox, 'faux_zenodo_sandbox_token')
        const access_token = helpers_get_access_token_from_environment(sandbox)
        const draft_id = '101'
        const reqheaders_get = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
        const reqheaders_delete = {
            'Authorization': `Bearer ${access_token}`
        }
        const draft_mock = get_mocked_data(draft_id)
        let mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders: reqheaders_get })
            .get(`/deposit/depositions/${draft_id}`)
            .times(1)
            .replyWithFile(200, draft_mock)
        mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders: reqheaders_delete })
            .delete(`/deposit/depositions/${draft_id}`)
            .times(1)
            .reply(200)
        await deposition_delete(access_token, sandbox, draft_id)
    })
})
