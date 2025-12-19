import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyDonationRequests = () => {
  const [myRequest, setMyRequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [itemsPerPage, setIteamPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/myRequests?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequest(res.data.request);
        setTotalRequest(res.data.totalRequest);
      });
  }, [axiosSecure, currentPage, itemsPerPage]);

  console.log(myRequest);

  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
  console.log(numberOfPages);
  const pages = [...Array(numberOfPages).keys()].map((page) => page + 1);
  console.log(pages);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Recipient Name</th>
              <th>Recipient Location</th>
              <th>Donation Date & Donation Time</th>
              <th>Blood Group</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myRequest.map((req, index) => (
              <tr>
                <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                <td>{req.recipientName}</td>
                <td>
                  <div>
                    <h3 className="text-base font-semibold">
                      {req.recipient_district}
                    </h3>
                    {req.recipient_upazila}
                  </div>
                </td>
                <td>{req.donation_date}</td>
                <td>{req.bloodgroup}</td>
                <td>
                  <button className="btn">Edit</button>
                </td>
                <td>
                  <button className="btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="justify-center items-center text-center">
        <button
          className="btn"
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          prev
        </button>
        {pages.map((page) => (
          <button
            onClick={() => {
              setCurrentPage(page);
            }}
            className={`btn ${
              page === currentPage ? "bg-red-300" : "bg-white"
            }`}
          >
            {page}
          </button>
        ))}
        <button 
        className="btn"
        disabled={currentPage ===numberOfPages}
        onClick={()=>{setCurrentPage(currentPage+1)}}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default MyDonationRequests;
