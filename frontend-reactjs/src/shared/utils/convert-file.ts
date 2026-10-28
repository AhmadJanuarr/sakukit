import { ClientFetching } from "./api";

export const ConvertFile = async (file: File, format: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("format", format);

  return ClientFetching<Blob>("image/convert", {
    method: "POST",
    body: formData,
    responseType: "blob",
  });
};
