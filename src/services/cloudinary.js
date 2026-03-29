export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "aura_upload"); // your preset

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dltvyhamc/image/upload",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await res.json();
  return data.secure_url;
};