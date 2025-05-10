import axiosClient from "../../axios";

const TTS_ENDPOINT = "https://koreacentral.tts.speech.microsoft.com/cognitiveservices/v1";


function constructBody(text: string) {
    return `<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Male'
    name='en-US-ChristopherNeural'>
        ${text}
    </voice></speak>`;
}

export async function callTtsApi(text: string) {
    const response = await axiosClient.post(TTS_ENDPOINT, constructBody(text), {
        responseType: "blob",
        headers: {
            "Content-Type": "application/ssml+xml",
            "Ocp-Apim-Subscription-Key": import.meta.env.VITE_AZURE_TTS_KEY,
            "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3"
        },
    });

    return response.data;
}

export async function tts(text: string) {
    const response = await callTtsApi(text);

    const blob = new Blob([response], { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);

    return url;
}