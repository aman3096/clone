import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import TrelloForm from "./TrelloForm";
import { editCard, deleteCard } from "../actions";
import { connect } from "react-redux";
import TrelloButton from "./assets/TrelloButton";

const CardContainer = styled.div`
  margin: 0 0 16px 0;
  position: relative;
  width: 331x;
  margin: 16px 12px;

  word-wrap: break-word;
  box-shadow: 3px 3px 10px rgba(149, 183, 198, 0.25);
  border-radius: 10px;
`;

const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
  box-shadow: 3px 3px 10px rgba(149, 183, 198, 0.25);
  border-radius: 10px;
`;

const DeleteButton = styled.img`
  position: absolute;
  right: 27px;
  bottom: 5px;

`;
const Tag = styled.img`
  position: absolute;
  right: 12px;
  bottom: 5px;
`
const Span = styled.span`
  height: 22px;
  color: white;
  font-weight: 500;
  line-height: 20px;
  padding: 7px;
  font-size: 11px;
  background: #05D2DF;
  margin-right: 10px;
  border-radius: 5px;
`
const NSpan = styled.span`
  height: 22px;
  color: white;
  font-weight: 500;
  line-height: 20px;
  padding: 7px;
  font-size: 11px;
  background: #409FF7;
  margin-right: 10px;
  border-radius: 5px;
`
const PSpan = styled.span`
  height: 22px;
  color: white;
  font-weight: 500;
  line-height: 20px;
  padding: 7px;
  font-size: 11px;
  background: #884BF1;
  margin-right: 10px;
  border-radius: 5px;
`

const Text = styled(Typography)`
height: 40px;
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
color: #091623;
margin-top:11px;
`
const TrelloCard = React.memo(({ text, id, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);

  const closeForm = e => {
    setIsEditing(false);
  };

  const handleChange = e => {
    setText(e.target.value);
  };

  const saveCard = e => {
    e.preventDefault();

    dispatch(editCard(id, listID, cardText));
    setIsEditing(false);
  };

  const handleDeleteCard = e => {
    console.log(listID);
    dispatch(deleteCard(id, listID));
  };

  const renderEditForm = () => {
    return (
      <TrelloForm text={cardText} onChange={handleChange} closeForm={closeForm}>
        <TrelloButton onClick={saveCard}>Save</TrelloButton>
      </TrelloForm>
    );
  };

  const renderCard = () => {
    return (
      <Draggable  draggableId={String(id)} index={index}>
        {provided => (
          <CardContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
          >
            <Card>
              <EditButton
                onMouseDown={() => setIsEditing(true)}
                fontSize="small"
              >
                edit
              </EditButton>
              <DeleteButton src={require('./assets/trash.png')} onMouseDown={handleDeleteCard}>
              </DeleteButton>
              <Tag src={require('./assets/tag.png')}></Tag>
              <CardContent>
                <NSpan style={{height:"22px"}}>Design Team</NSpan>
                <Span style={{height:"22px"}}>Help</Span>
                <PSpan style={{height:"22px"}}>Copy Request</PSpan>
                <Text style={{marginTop:"11px", fontWeight: 500, fontFamily: "Roboto", fontSize: "14px",lineHeight: "20px", color: "#091623"}}>{text}</Text>
              </CardContent>
            </Card>
          </CardContainer>
        )}
      </Draggable>
    );
  };

  return isEditing ? renderEditForm() : renderCard();
});

export default connect()(TrelloCard);
