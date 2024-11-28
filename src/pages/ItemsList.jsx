import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Spinner from "./Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override = {
  display: "block",
  margin: "100px auto",
};

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://6747017738c8741641d503ba.mockapi.io/items"
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        const sortedItems = result.sort(
          (a, b) => new Date(b.datetime) - new Date(a.datetime)
        );
        setItems(sortedItems);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = async (item) => {
    setIsUpdating(true);
    const url = `https://6747017738c8741641d503ba.mockapi.io/items/${item.id}`;
    const data = { status: true };
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // const result = await response.json();
        // alert("Marked as collected item ", result);

        const res = await fetch(
          "https://6747017738c8741641d503ba.mockapi.io/items"
        );
        const result = await res.json();
        const sortedItems = result.sort(
          (a, b) => new Date(b.datetime) - new Date(a.datetime)
        );
        setItems(sortedItems);
      } else {
        console.error("Update failed : ", response.statusText);
      }
    } catch (error) {
      console.error("Error Occured : ", error);
    } finally {
      setIsUpdating(false);
      toast.success("Marked as found");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 via-white to-blue-100 p-4">
      <div className="max-w-7xl w-full">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Spinner
              loading={loading}
              progressStage="Fetching data from backend..."
            />
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-center mb-6 text-gray-900 underline">
              Uncollected Items
            </h2>

            <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Select
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Date & Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Item Found
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Collect From
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Image
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map(
                  (item, id) =>
                    item.status === false && (
                      <tr
                        key={id}
                        className="hover:bg-gray-50 odd:bg-gray-50 even:bg-white"
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            disabled={isUpdating}
                            className="rounded border-gray-300"
                            onClick={() => handleCheckboxChange(item)}
                          />
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {formatDistanceToNow(new Date(item.datetime), {
                            addSuffix: true,
                          })}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {item.objectName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {item.contactPerson}
                        </td>
                        <td className="px-4 py-3 text-sm text-blue-500">
                          <a
                            href={item.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Image
                          </a>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>

            {/* Collected Items Table */}
            {
              <>
                <h2 className="text-4xl font-bold text-center mt-12 mb-6 text-gray-900 underline">
                  Collected Items
                </h2>
                <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Date & Time
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Item Found
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Collect From
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Image
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {items.map(
                      (item, id) =>
                        item.status && (
                          <tr
                            key={id}
                            className="hover:bg-graynp-50 odd:bg-gray-50 even:bg-white"
                          >
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {formatDistanceToNow(new Date(item.datetime), {
                                addSuffix: true,
                              })}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {item.objectName}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {item.contactPerson}
                            </td>
                            <td className="px-4 py-3 text-sm text-blue-500">
                              <a
                                href={item.imageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Image
                              </a>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </>
            }
          </>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default ItemsList;
