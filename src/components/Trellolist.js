import React, { useState } from "react";
import TrelloCard from "./TrelloCard";
import TrelloCreate from "./TrelloCreate";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { editTitle, deleteList } from "../actions";

const ListContainer = styled.div`
  background-color: #F3F7F8;
  border-radius: 10px;
  width: 331px;
  min-height: 551px;
  padding: 8px;
  margin: 0 22px 0 0;
`;

const StyledInput = styled.input`
  width:331px;
  border: none;
  outline-color: blue;
  border-radius: 10px;
  margin-bottom: 3px;
  padding: 5px;
`;

const TitleContainer = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  height: 20px;
  margin:12px 16px 0 16px;

`;

const DeleteButton = styled.img`
  cursor: pointer;

  margin-left: 280px;
`;

const Tag = styled.img`
  cursor: pointer;
  margin-left: 10px;
`
const ListTitle = styled.h4`
  transition: background 0.3s ease-in;
  ${TitleContainer}:hover & {
    background: #ccc;
  }
  height: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  color: #091623;

`;

const HardDiv = styled.div`
  background: #FFFFFF;
  width: 295px;
  height: 56px;
  margin-left:12px;
  margin-top:16px;
  display: flex;
  font-family: Roboto;
  font-weight: 500;
  font-size:14px;
  line-height: 20px;
  align-items: center;
  padding-left: 20px;
  background: #FFFFFF;
box-shadow: 3px 3px 10px rgba(149, 183, 198, 0.25);
border-radius: 10px;
`

const ImgDiv = styled.div`
  background: #FFFFFF;
  padding-right: 20px;
  margin-left:40px;
  border-radius: 10px;

`
const Img = styled.img`
    width: 34.09px;
    height: 30px;
    margin-left:2px;
    border-radius: 50%;

`

const TrelloList = ({ title, cards, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  const renderEditInput = () => {
    return (
      <form onSubmit={handleFinishEditing}>
        <StyledInput
          type="text"
          value={listTitle}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
        />
      </form>
    );
  };

  const handleFocus = e => {
    e.target.select();
  };

  const handleChange = e => {
    e.preventDefault();
    setListTitle(e.target.value);
  };

  const handleFinishEditing = e => {
    setIsEditing(false);
    dispatch(editTitle(listID, listTitle));
  };

  const handleDeleteList = () => {
    dispatch(deleteList(listID));
  };

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {provided => (
        <ListContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(listID)} type="card">
            {provided => (
              <>
                <div>
                  {isEditing ? (
                    renderEditInput()
                  ) : (
                    <>
                    <TitleContainer>
                      <ListTitle>{listTitle}</ListTitle>
                    </TitleContainer>
                  <TrelloCreate listID={listID} />
                  </>
                  )}
                </div>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cards.map((card, index) => (
                    <TrelloCard
                      key={card.id}
                      text={card.text}
                      id={card.id}
                      index={index}
                      listID={listID}
                    />
                  ))}
                  {provided.placeholder}
                  <HardDiv>Weekly Updates<ImgDiv>
                        <Img src={require('./assets/i1.png')}/>
                        <Img src={require('./assets/i2.png')}/>
                        <Img src={require('./assets/i3.png')}/>
                    </ImgDiv>
                  </HardDiv>
                  <DeleteButton src={require('./assets/trash.png')} onClick={handleDeleteList}>   
                  </DeleteButton>
                  <Tag src={require('./assets/tag.png')}></Tag> 

                </div>
              </>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
};

export default connect()(TrelloList);
