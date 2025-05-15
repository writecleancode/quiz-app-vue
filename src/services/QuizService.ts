import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const getQuizzesData = () => {
    return apiClient.get('/quizzes')
}

export const getCountriesList = async () => {
    return await apiClient.get('/quizzesData?path=panstwa-europy')
}

export const getQuizDrivingLicense = () => {
    return apiClient.get('/quizzesData?path=prawo-jazdy')
}

export const getQuizKnowledgeOfMovies = () => {
    return apiClient.get('/quizzesData?path=znajomosc-filmow')
}

export const getQuizRecognizeLogo = () => {
    return apiClient('/quizzesData?path=rozpoznaj-logo')
}