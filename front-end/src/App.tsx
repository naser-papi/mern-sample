import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Container, useTheme } from "@mui/material";
import { setList, addToList, updateItem } from "./state/infoSlice";
import { IInfo, IAppState } from "./models/General";
import MainContainer from "./MainContainer";
import useCallApi from "./hooks/useCallApi";
import InfoList from "./InfoList";
import "./App.css";
import useNotifyBar from "./hooks/useNotifyBar";
const appInitInfo: IInfo = {
  email: "",
  password: "",
  new: true,
  id: ""
};
function App() {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>();
  const { info: infoState, general } = useSelector((state: IAppState) => state);
  const { infoList } = infoState;
  const { isBusy, notify } = general;
  const [info, setInfo] = useState<IInfo>({ ...appInitInfo });
  const [callApi] = useCallApi();
  const [openToast, , snackBar] = useNotifyBar();
  useEffect(() => {
    if (notify) {
      openToast(notify);
    }
  }, [notify]);
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
    let item = { ...appInitInfo };
    if (id && id !== "0") {
      item = infoList.find((item) => item.id === id);
    }
    if (item) {
      setInfo({
        ...item,
        new: false
      });
    }
    inputRef.current?.focus(null);
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
    <MainContainer>
      <form onSubmit={submitHandler}>
        <TextField
          autoFocus
          inputRef={inputRef}
          id="email"
          name={"email"}
          label="Email"
          variant="outlined"
          value={info.email}
          onChange={onChangeHandler}
        />
        <TextField
          id="passowrd"
          name={"password"}
          label="Password"
          variant="outlined"
          value={info.password}
          onChange={onChangeHandler}
        />
        <Button type={"submit"} variant={"outlined"}>
          {info.new ? "Add" : "Update"}
        </Button>
      </form>
      <InfoList list={infoList} current={info} handleInfoClick={handleInfoClick} />
      {snackBar}
    </MainContainer>
  );
}

export default App;
