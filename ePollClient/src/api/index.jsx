import axios from "axios";

export const BASE_URL = 'http://localhost:5120/';

export const ENDPOINTS = {
    question: 'question',
    answer: 'answer',
    both: 'Question/createQuestionWithOptions'
}

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + 'api/'+ endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRocord => axios.post(url, newRocord),
        put: (id, updateRecord) => axios.put(url + id, updateRecord),
        delete: id => axios.delete(url + id)
    }
}

