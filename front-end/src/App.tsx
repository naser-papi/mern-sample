import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setList, addToList, updateItem } from "./state/infoSlice";
import { IInfo, IAppState } from "./models/General";
import useCallApi from "./hooks/useCallApi";
import InfoList from "./InfoList";
import "./App.css";
const appInitInfo: IInfo = {
  email: "",
  password: "",
  new: true,
  id: ""
};
function App() {
  const dispatch = useDispatch();
  const { info: infoState, general } = useSelector((state: IAppState) => state);
  const { infoList } = infoState;
  const { isBusy } = general;
  const [info, setInfo] = useState<IInfo>({ ...appInitInfo });
  const [callApi] = useCallApi();
  useEffect(() => {
    //read list form backend
    callApi({
      url: "info",
      method: "GET",
      successHandler: (list) => {
        dispatch(setList(list));
      }
    });
  }, []);

  const handleInfoClick = (id: string) => {
    const item = infoList.find((item) => item.id === id);
    if (item) {
      setInfo({
        ...item,
        new: false
      });
    }
  };

  const onChangeHandler = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (isBusy) {
      alert("wait.....");
      return;
    }
    if (info.new) {
      callApi({
        url: "info",
        method: "POST",
        getBody: () => ({
          email: info.email,
          password: info.password
        }),
        successHandler: (item) => {
          dispatch(addToList(item));
          setInfo({ ...appInitInfo });
        }
      });
    } else {
      callApi({
        url: `info/${info.id}`,
        method: "PUT",
        getBody: () => ({
          email: info.email,
          password: info.password
        }),
        successHandler: (item) => {
          dispatch(updateItem(item));
          setInfo({ ...item, new: false });
        }
      });
    }
  };
  return (
    <div className={"infoManagement"}>
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
      <InfoList list={infoList} current={info} handleInfoClick={handleInfoClick} />
    </div>
  );
}

export default App;
