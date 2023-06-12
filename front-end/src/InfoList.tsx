import React from "react";
import { IInfo, IInfoList } from "./models/General";
import { maskEmail } from "./helpers/Utils";

const InfoItem: React.FC<IInfo> = (props) => {
  return (
    <li
      className={props.selected ? "selected" : ""}
      key={props.id}
      onClick={() => (props.handleInfoClick ? props.handleInfoClick(props.id) : null)}
    >
      <strong>{maskEmail(props.email)}</strong>
      <span>{props.password}</span>
    </li>
  );
};
const InfoList: React.FC<IInfoList> = ({ list, current, handleInfoClick }) => {
  const elements = list.map((item) => (
    <InfoItem
      {...item}
      key={item.id}
      selected={current.id === item.id}
      handleInfoClick={handleInfoClick}
    />
  ));

  return (
    <div className={"infoList"}>
      <ul>{elements && elements.length ? elements : <p>List is Empty...</p>}</ul>
    </div>
  );
};

export default InfoList;
