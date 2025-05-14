import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const getQuizzesData = () => {
    return apiClient.get('/quizzes')
}

export const getCountriesList = () => {
    return apiClient.get('/countriesList')
}

export const getQuizDrivingLicense = () => {
    return apiClient.get('/drivingLicense')
}

export const getQuizKnowledgeOfMovies = () => {
    return apiClient.get('/knowledgeOfMovies')
}

export const getQuizRecognizeLogo = () => {
    return apiClient('/recognizeLogo')
}