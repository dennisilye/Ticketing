import axios from "axios";
import { useState } from "react";

type Method = "get" | "patch" | "create" | "delete" | "post";

export default ({
  url,
  method,
  body,
  onSuccess,
}: {
  url: string;
  method: Method;
  body: any;
  onSuccess: (cb: any) => any;
}) => {
  const [errors, setErrors] = useState<any>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response: any = await axios[method](url, body, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.data) {
        onSuccess(response.data);
      }
      

      return response.data;
    } catch (err: any) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {err?.response?.data?.errors?.map((err: any) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return [doRequest, errors];
};
