import React from "react";

function Error({ error }) {
  if (!error) return null;
  return (
    <div data-testid="errorMsg" className="alert error mt-20 slide-up-fade-in">
      {error}
    </div>
  );
}

export default Error;
