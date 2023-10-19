import React, { useCallback, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Formik, useFormik } from "formik";
import Wrapper from "../../components/Wrapper";
import { IconButton, Button, Box, TextField } from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import * as yup from "yup";

const Performance = () => {
  const uploadSchema = yup.object().shape({
    attachments: yup.array(),
  });

  const initialFormValues = {
    attachments: "",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }

    for (let file in files) {
      formData.append("attachments", files[file]);
      formData.append("fileName", files[file].name);
    }

    // formData.append("attachments", files);

    try {
      //TODO: need to change endpoint to save file
      // const data = await fetch("http://localhost:3002/projects", {
      //   method: "POST",

      //   body: formData,
      // }).then((res) => res.json());

      alert(formData.getAll("attachments"));
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
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "application/pdf": [],
      "application/vnd.ms-excel": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
  });
  const [files, setFiles] = useState([]);
  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };
  return (
    <div className="max-w-lg p-8 items-center text-center ">
      <Wrapper>
        <div className="gap-2  text-gray-400 h-fit p-4">
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
                    // gridColumn="span 4"
                    // border={`2px dashed`}
                    // borderRadius="5px"
                    // sx={{ "&:hover": { cursor: "pointer" } }}
                    // p=".5rem"
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop files here...</p>
                    ) : (
                      <p>
                        You may click here or drop the files to start the
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
                          <DeleteOutlined />
                        </IconButton>
                      </li>
                    ))}
                  </ul>
                </Box>
                {/* BUTTONS */}
                <Box>
                  <button
                    type="submit"
                    className=" hover:bg-teal-500 w-full p-2 rounded-lg  hover:text-slate-900 font-bold bg-slate-900 text-teal-500"
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
  );
};

export default Performance;
