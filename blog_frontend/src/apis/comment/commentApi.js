import axios from "axios";
import jsonConfig from "../../../config.json";

const BASE_URL = jsonConfig.apiurl;

export const getCommentsByBlogId = async (id) => {
    try {
        const url = BASE_URL + `/posts/${blogId}/comments`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch comment");
        return await response.json();
    } catch (error) {
        console.error("Error fetching comment:", error);
        return null;
    }
};

export const addComment = async (blogId,comment) => {
    if (!comment) return;
    const url = BASE_URL + `/posts/${blogId}/comments`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment),
        });
        if(response.ok){
            const data = await response.text();
            return data;
        }
        console.log("response comment:-",response)
        return "";
      } catch (error) {
          console.error("Error posting comment:", error);
          throw error;
      }
};