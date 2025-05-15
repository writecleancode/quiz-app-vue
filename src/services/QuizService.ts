import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const getQuizzesData = () => {
    return apiClient.get('/quizzes')
}

export const getQuizData = async (quizPath: string) => {
    return await apiClient.get(`/quizzesData?path=${quizPath}`)
}