import axios from "axios";
import jsonConfig from "../../../config.json";

const BASE_URL = jsonConfig.apiurl;

export const addBlobImage = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const url = BASE_URL + '/blog/blobUpload';
    try {
          const response = await fetch(url, {
              method: "POST",
              body: formData,
          });
          return response;
      } catch (error) {
          console.error("Error uploading file:", error);
          throw error;
      }
};

export const deleteBlobImage = async (fileUrl) => {
    if (!fileUrl) return;
    const url = BASE_URL + '/blog/blobDelete';
    try {
        const fileName = fileUrl.split("/").pop();
        const response = await fetch(`${url}?fileName=${fileName}`, {
            method: "DELETE",
        });
        return response;
        
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }

};

export const createBlogPost = async (blog) => {
    if (!blog) return;
    const url = BASE_URL + '/posts';

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog),
        });
        if(response.ok){
            const data = await response.text();
            return data;
        }
        console.log("response:-",response)
        return "";
      } catch (error) {
          console.error("Error posting blog:", error);
          throw error;
      }
}

export const getAllBlogPost = async () => {
    const url = BASE_URL + '/posts';
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch blogs");
        }
        return await response.json();
      } catch (error) {
          console.error("Error getting blog:", error);
          throw error;
      }
}

export const getBlogById = async (id) => {
    try {
        const url = BASE_URL + '/posts/';
        const response = await fetch(url+id);
        if (!response.ok) throw new Error("Failed to fetch blog");
        return await response.json();
    } catch (error) {
        console.error("Error fetching blog:", error);
        return null;
    }
};

