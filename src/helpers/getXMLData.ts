import axios, { AxiosPromise } from "axios";
import { AppError } from "./errors/appError.js";

export async function getXMLData(url: string): Promise<AxiosPromise> {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error();
  } catch (error) {
    throw new AppError("Não foi possível buscar os dados RSS", 503);
  }
}
