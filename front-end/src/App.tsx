import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setList, setIsBusy, addToList } from "./state/infoSlice";

import "./App.css";
import { IAppInfo, IAppState } from "./models/General";

const appInitInfo: IAppInfo = {
  email: "",
  password: "",
  new: true
};
function App() {
  const dispatch = useDispatch();
  const { infoList, isBusy } = useSelector((state: IAppState) => state.info);
  const [info, setInfo] = useState<IAppInfo>({ ...appInitInfo });
  useEffect(() => {
    //read list form backend
    dispatch(setIsBusy(true));
    axios
      .get("http://localhost:8082/api/info")
      .then((resp) => {
        dispatch(setList(resp.data));
      })
      .catch((err) => {
        console.error("ERR while read list: ", err);
      })
      .finally(() => {
        dispatch(setIsBusy(false));
      });
  }, []);

  //TODO:: need better solution
  //after any add or update isBusy will change and rerender will occurs for all list
  const list = isBusy ? (
    <p>loading....</p>
  ) : infoList.length == 0 ? (
    <p>List is Empty</p>
  ) : (
    infoList.map((item) => (
      <li key={item.email}>
        <strong>{item.email}</strong>
        <span>{item.password}</span>
      </li>
    ))
  );
  const onChangeHandler = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (isBusy) {
      alert("wait...");
      return;
    }
    dispatch(setIsBusy(true));
    axios
      .post("http://localhost:8082/api/info", {
        email: info.email,
        password: info.password
      })
      .then((resp) => {
        //resp.data will have id too
        dispatch(addToList(resp.data));
        setInfo({ ...appInitInfo });
        dispatch(setIsBusy(false));
      })
      .catch((err) => {
        console.error("ERR while add new item", err);
      })
      .finally(() => {
        dispatch(setIsBusy(false));
      });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type={"email"}
          name={"email"}
          placeholder={"Email"}
          value={info.email}
          onChange={onChangeHandler}
        />
        <input
          type={"password"}
          name={"password"}
          placeholder={"Password"}
          value={info.password}
          onChange={onChangeHandler}
        />
        <button type={"submit"}>{info.new ? "Add" : "Update"}</button>
      </form>
      <div>
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;
