import axiosClient from "../../axios";

export async function callTtsApi(text: string) {
  const response = await axiosClient.post(
    "/tts",
    { text },
    {
      responseType: "blob",
    },
  );

  return response.data; // content type: audio/mp3
}

export async function tts(text: string) {
  const response = await callTtsApi(text);

  const blob = new Blob([response], { type: "audio/mp3" });
  const url = URL.createObjectURL(blob);

  return url;
}
