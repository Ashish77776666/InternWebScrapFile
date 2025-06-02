import { useMemo, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import { app } from "../firebase";
import { useTable, useSortBy, usePagination } from "react-table";
import "./tablestyle.css";

const firestore = getFirestore(app);

const Webscarp = () => {
  const [urlValue, setUrlValue] = useState("");
  const [data, setData] = useState([]);
  const [bookName, setBookName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const writeData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(urlValue);
      const response = await fetch("https://puppeteer-scraper-os7q.onrender.com/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlValue }),
      });
      const result = await response.json();
      await addDoc(collection(firestore, "webscrap"), result);
      setData(result.books || []);
      setBookName(result.book_name || "");
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Rating",
        accessor: "rating",
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 rounded ${
              value === "Five"
                ? "bg-green-200"
                : value === "Four"
                ? "bg-blue-200"
                : value === "Three"
                ? "bg-yellow-200"
                : value === "Two"
                ? "bg-orange-200"
                : "bg-red-200"
            }`}
          >
            {value} Star{value !== "One" ? "s" : ""}
          </span>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="webscarp-page">
        <div id= "urlpage">
      <h1>Web Scrap</h1>
      <label>URL</label>
      <input
        onChange={(e) => setUrlValue(e.target.value)}
        value={urlValue}
        type="url"
        required
        placeholder="Enter URL"
      />
      <button onClick={writeData}>Scrape Now</button>
      </div>

      {loading && <div id= "urlpage" className="text-center mt-8">Loading...</div>}
      {error && <div className="text-center mt-8 text-red-600">Error: {error}</div>}
      {!loading && !error && data.length > 0 && (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">{bookName}</h1>
          <div className="overflow-x-auto">
            <table
              {...getTableProps()}
              className="min-w-full bg-white border border-gray-300"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className="px-4 py-2 border-b bg-gray-100 text-left text-sm font-medium text-gray-700"
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="hover:bg-gray-50">
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="px-4 py-2 border-b text-sm text-gray-700"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div id="mainbutton" className="flex justify-between mt-4">
              <div id="leftbutton">
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Previous
                </button>
              </div>
              <div id="rightbutton">
                <button
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 mt-4">
              <div id="pageoutof">
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </div>
              <div id="pagenumber">
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="px-2 py-1 border rounded"
                >
                  {[10, 20, 30, 40, 50].map((size) => (
                    <option key={size} value={size}>
                      Show {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Webscarp;