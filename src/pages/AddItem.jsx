import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const [formData, setFormData] = useState({
    objectName: "",
    location: "",
    datetime: "", // will be set to current date and time
    contactPerson: "",
    status: false,
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [progressStage, setProgressStage] = useState("");

  // Set current datetime when the component mounts
  useEffect(() => {
    const currentDate = new Date();

    // Add 5 hours 30 minutes to the current time (for IST)
    currentDate.setHours(currentDate.getHours() + 5);
    currentDate.setMinutes(currentDate.getMinutes() + 30);

    // Format the adjusted time as YYYY-MM-DDTHH:mm
    const currentDateTime = currentDate.toISOString().slice(0, 16);

    setFormData((prevData) => ({
      ...prevData,
      datetime: currentDateTime,
    }));
  }, []);
  // Empty dependency array to run only once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgressStage("Uploading image...");
    if (
      !formData.objectName ||
      !formData.location ||
      !formData.contactPerson ||
      !formData.datetime
    ) {
      toast.error("Please fill in all the fields.");
      setLoading(false);
      return;
    }
    if (!imageFile) {
      toast.error();
      setLoading(false);
      return;
    }
    try {
      const imgApi = "c93e1a4682dd039e2e330ef3387462af";
      const imgUrl = `https://api.imgbb.com/1/upload?key=${imgApi}`;

      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      const imgResponse = await fetch(imgUrl, {
        method: "POST",
        body: imageFormData,
      });

      const imgResult = await imgResponse.json();
      if (imgResult.success) {
        const uploadedImageUrl = imgResult.data.url;
        setImageUrl(uploadedImageUrl);
        setProgressStage("Image uploaded successfully. Adding item...");

        const completeData = {
          ...formData,
          imageUrl: uploadedImageUrl,
        };

        const response = await fetch(
          "https://6747017738c8741641d503ba.mockapi.io/items",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(completeData),
          }
        );

        if (response.ok) {
          setFormData({
            objectName: "",
            location: "",
            datetime: "", // Reset datetime after submission
            contactPerson: "",
          });
          setImageFile(null);
          setImageUrl("");
        } else {
          console.error("Failed to add items.");
        }
      } else {
        console.error("Image Upload Failed ", imgResult);
        alert("Image upload failed, please try again");
      }
    } catch (error) {
      console.error("Error uploading image or posting data: ", error);
    } finally {
      setLoading(false);
      setProgressStage("");
      toast.success("Lost item added successfully");
      setTimeout(() => {
        navigate("/items-list");
      }, 1500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 via-white to-blue-100">
      {loading ? (
        <Spinner loading={loading} progressStage={progressStage} />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
        >
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white underline">
            Report Lost Item
          </h2>

          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="o-id"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Object Name
              </label>
              <input
                type="text"
                name="objectName"
                id="o-id"
                placeholder="Enter Object Name"
                value={formData.objectName}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Enter any nearby checkpoint"
                value={formData.location}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="dnt"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Date & Time
              </label>
              <input
                type="datetime-local"
                name="datetime"
                id="dnt"
                value={formData.datetime}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                id="contact"
                placeholder="Whom should they contact?"
                value={formData.contactPerson}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <input
              type="submit"
              value="Submit"
              className="px-8 py-2.5 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            />
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
}
