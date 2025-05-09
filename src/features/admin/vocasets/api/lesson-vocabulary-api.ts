import axiosClient from "../../../../axios";

export async function attachNewWordsToLesson(request: {lessonId: number|string, wordIds: number[] | string[] }) {
    const {lessonId, wordIds} = request;

    const wordObjects = wordIds.map(wordId => ({ vocabularyId: wordId}));
    const response = await axiosClient.post(`/lessons/${lessonId}/words`, {
        words: wordObjects,
    });

    return response.data;
}