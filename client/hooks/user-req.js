import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const performReq = async () => {
    try {
      setErrors(null);
      const res = await axios[method](url, body);
      if(onSuccess){
        onSuccess(res.data);
      }
      return res.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Error</h4>
          <ul>
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return {
    performReq,
    errors,
  };
};

export default useRequest;
