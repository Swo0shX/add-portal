import React from "react";

export default async function KRASummary() {
  return <div> Hello </div>;
  // <></>

  /* <div className="text-heading1-bold text-stone-300 text-center">
        {" "}
        Performance Details
      </div>
      <div className="items-center  min-h-screen bg-gray-900 rounded-xl">
        <div className="col-span-12">
          <div className="overflow-auto lg:overflow-visible ">
            <table className="table text-stone-400 border-separate space-y-6 text-sm">
              <thead className="bg-blue-600 text-stone-400">
                <tr className="border-gray-800">
                  <th className="p-3">Request Type</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Date Received</th>
                  <th className="p-3 text-left">Target End Date</th>
                  <th className="p-3 text-left">Date Completed</th>
                  <th className="p-3 text-left">Request Status</th>
                  <th className="p-3 text-left">KRA</th>
                  <th className="p-3 text-left">Rating</th>
                </tr>
              </thead>
              <tbody>
                {accompList.map((item, i) => (
                  <tr key={i} className="bg-gray-800">
                    <td className="p-3">{item.requestType}</td>
                    <td className="p-3">{item.description}</td>
                    <td className="p-3">
                      {item.dateReceived.toString().substring(3, 24)}
                    </td>
                    <td className="p-3">
                      {item.targetEndDate.toString().substring(3, 24)}
                    </td>
                    <td className="p-3">
                      {item.dateCompleted.toString().substring(3, 24)}
                    </td>
                    {/* <td>{item.DateCompleted}</td> */
}
//     <td className="p-3">{item.requestStatus}</td>
//     <td className="p-3">{item.kra}</td>
//     <td className="p-3">{item.rating}</td>
//   </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>
//</div> */}
