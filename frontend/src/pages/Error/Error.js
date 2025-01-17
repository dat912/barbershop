import React from "react";

export default function Error() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center font-monospace fw-bolder">
        <h1 className="mt-4 text-danger">404 - Page Not Found</h1>
        <p className="text-muted">
          Sorry, the page you are looking for does not exist.
        </p>
        <a href="/" className="btn btn-primary mt-3">
          Go Back
        </a>
      </div>
    </div>
  );
}
