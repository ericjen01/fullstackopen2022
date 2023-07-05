import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_NUMBER } from "./queries";

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  const submit = (e) => {
    e.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName("");
    setPhone("");
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError("result not found");
    }
  }, [result.data]);

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name:{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          phone:{" "}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
          <button type="submit">update phone number</button>
        </div>
      </form>
    </div>
  );
};

export default PhoneForm;
