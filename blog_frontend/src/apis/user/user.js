import axios from "axios";
import jsonConfig from "../../../config.json";

const BASE_URL = jsonConfig.apiurl;

export const login = async (formData) => {
    if (!formData) return;
    const url = BASE_URL + '/login';
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.text();
        return data;
      } catch (error) {
          console.error("Error uploading file:", error);
          throw error;
      }
};

export const logout = async (sessionKey) => {
    console.log("sessionKey",sessionKey)
    if (!sessionKey) return;
    const url = BASE_URL + `/logout/${sessionKey}`;
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(formData),
        });

        return response.ok;
      } catch (error) {
          console.error("Error while logout:", error);
          throw error;
      }
};