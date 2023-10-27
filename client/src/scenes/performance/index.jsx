import React, { useCallback, useState, useEffect } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Formik, useFormik } from "formik";
import Wrapper from "../../components/Wrapper";
import { IconButton, Button, Box, TextField } from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import * as yup from "yup";
import KRASummary from "../../components/KRASummary";

const Performance = () => {
  const [accompList, setAccompList] = useState([]);
  const user = "mark";
  const getAccomplishments = async () => {
    const response = await fetch(`http://localhost:3003/performance/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Accept: "**",
      },
    });
    const data = await response.json();
    setAccompList(data);
  };

  useEffect(() => {
    // sampleProjects();
    getAccomplishments();
  }, []);

  const uploadSchema = yup.object().shape({
    attachments: yup.array(),
  });

  const initialFormValues = {
    attachments: "",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();

    formData.append("userId", "mpozaeta");

    for (let file in files) {
      formData.append("attachments", files[file]);
      formData.append("filename", files[file].name);
    }

    try {
      const data = await fetch("http://localhost:3003/performance/uploadfile", {
        // const data = await fetch(
        // "http://172.19.13.216:3101/performance/uploadfile",

        method: "POST",

        body: formData,
      }).then((res) => res.json());
    } catch (err) {
      alert(err);
    }
    // onSubmitProps.ResetForm();
  };
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      // "application/msword": [],
      // "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      //   [],
      // "application/pdf": [],
      "application/vnd.ms-excel": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
  });
  const [files, setFiles] = useState([]);
  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };
  return (
    <div className="flex flex-row gap-1 text-opacity-25">
      <div className="max-w-sm pt-10 pl-7 pr-6 items-center text-center ">
        <Wrapper>
          <div className="text-gray-400 h-fit p-4">
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialFormValues}
              validationSchema={uploadSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="pb-4 font-bold">UPLOAD MONITORING FILE</div>
                  <Box
                    display="grid"
                    // bgcolor={theme.palette.background.neutral}
                    gap="15px"
                    sx={{
                      "& .MuiFormLabel-root": { fontSize: "14px" },
                      // "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                  >
                    <div
                      className="pt-2 h-20 border-dashed border border-slate-400 hover:cursor-pointer"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop files here...</p>
                      ) : (
                        <p className="p-1">
                          You may click here or drop the file to start the
                          upload.
                        </p>
                      )}
                    </div>
                    {/*file preview */}
                    <ul>
                      {files.map((file) => (
                        <li key={file.name}>
                          {file.name}
                          <IconButton
                            // sx={{ width: "15%" }}
                            type="button"
                            onClick={() => removeFile(file.name)}
                          >
                            <DeleteOutlined className="rounded-xl text-slate-400 hover:bg-red-500 hover:text-slate-800" />
                          </IconButton>
                        </li>
                      ))}
                    </ul>
                  </Box>
                  {/* BUTTONS */}
                  <Box>
                    <button
                      type="submit"
                      className=" hover:bg-teal-400 w-full p-2 rounded-lg  hover:text-slate-900 font-bold bg-slate-900 text-teal-400"
                      // fullWidth
                      // type="submit"
                      // sx={{
                      //   m: "2rem 0",
                      //   p: "0.75rem",
                      //   // backgroundColor: theme.palette.grey[400],
                      //   // color: theme.palette.secondary.alt,
                      //   fontSize: "13px",
                      //   fontWeight: "bold",
                      //   "&:hover": {
                      //     // color: theme.palette.primary.main,
                      //     // backgroundColor: theme.palette.secondary[600],
                      //   },
                      // }}
                    >
                      SUBMIT
                    </button>
                  </Box>
                </form>
              )}
            </Formik>
          </div>
        </Wrapper>
      </div>
      <div className="pt-10 max-h-10 max-w-5xl items-center h-screen">
        <Wrapper>
          <div className="text-center font-bold text-teal-400 text-heading3-bold">
            Performance Details
          </div>
          <div className="min-h-screen rounded-xl pt">
            <div className="col-span-12">
              <div className="max-h-screen">
                <table className="table  text-gray-400 border-separate border-gray-500 space-y-6 ">
                  <thead className="bg-gray-700 text-gray-300">
                    <tr className="">
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
                  <tbody className="">
                    {accompList.map((item, i) => (
                      <tr key={i} className="">
                        <td className="p-3">{item.requestType}</td>
                        <td className="max-w-md">{item.description}</td>
                        <td className="p-3">
                          {item.dateReceived.toString().substring(0, 16)}
                        </td>
                        <td className="p-3">
                          {item.targetEndDate.toString().substring(0, 16)}
                        </td>
                        <td className="p-3">
                          {item.dateCompleted.toString().substring(0, 16)}
                        </td>
                        {/* <td>{item.DateCompleted}</td> */}
                        <td className="p-3">{item.requestStatus}</td>
                        <td className="p-3">{item.kra}</td>
                        <td className="p-3">{item.rating}</td>{" "}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Performance;
