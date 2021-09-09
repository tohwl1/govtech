//upload component

import axios from "axios";
import React, { Component, useState } from "react";
import Alert from "react-bootstrap/Alert";

class Upload extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    error: false,
    success: false,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  setError = () => {
    this.setState({ error: true });
  };
  setSuccess = () => {
    this.setState({ success: true });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("file", this.state.selectedFile);
    console.log(formData);

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios
      .post("http://localhost:8080/users/upload", formData, {})
      .then((res) => {
        this.setSuccess();
      })
      .catch((error) => {
        console.log(error);
        this.setError();
      });
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose CSV File before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {!this.state.error ? null : (
          <Alert
            variant="danger"
            onClose={() => this.setState({ error: false })}
            dismissible
            style={{ marginTop: "5px", marginBottom: "10px" }}
          >
            <Alert.Heading>Upload Failed!</Alert.Heading>
          </Alert>
        )}
        {!this.state.success ? null : (
          <Alert
            variant="success"
            onClose={() => this.setState({ success: false })}
            dismissible
            style={{ marginTop: "5px", marginBottom: "10px" }}
          >
            <Alert.Heading>Upload Success!</Alert.Heading>
          </Alert>
        )}
        <h1>Govtech CSV Uploader</h1>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default Upload;
