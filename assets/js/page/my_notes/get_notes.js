import {sendRequest} from "../../lib/server.func.js";

const get_notes = async () => {
    const form_data = new FormData()
    form_data.append('action', 'get_notes');
    return await sendRequest(form_data)
}

export {get_notes}