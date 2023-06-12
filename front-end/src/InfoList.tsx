import React from "react";
import { Box, List, ListItem, styled } from "@mui/material";
import { IInfo, IInfoList } from "./models/General";
import { maskEmail } from "./helpers/Utils";

const ListBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  width: "100$",
  padding: theme.spacing(2),
  ".MuiListItem-root": {
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer"
  },
  ".selected": {
    backgroundColor: theme.palette.info.dark
  },
  ".newItem": {
    color: theme.palette.secondary.main
  }
}));
const InfoItem: React.FC<IInfo> = (props) => {
  return (
    <ListItem
      className={props.selected ? "selected" : ""}
      key={props.id}
      onClick={() => (props.handleInfoClick ? props.handleInfoClick(props.id) : null)}
    >
      <strong>{maskEmail(props.email)}</strong>
      <span>{props.password}</span>
    </ListItem>
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
    <ListBox>
      <List>
        {elements?.length ? elements : <p>List is Empty...</p>}
        <ListItem className={"newItem"} onClick={() => handleInfoClick("0")}>
          <strong>New Item</strong>
        </ListItem>
      </List>
    </ListBox>
  );
};

export default InfoList;
