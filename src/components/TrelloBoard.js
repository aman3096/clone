import React, { PureComponent } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloCreate from "./TrelloCreate";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort, setActiveBoard } from "../actions";
import { Link } from "react-router-dom";
const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;

`;

const StyledNav = styled.nav`
background: linear-gradient(269.87deg, #2675EB 0%, #0ED7F2 100%);
display: flex;
justify-content: space-between;
`;

const Button = styled.button`
  height: 44px;
  background: #19D9FB;
  border-radius: 5px;
  border:none;
  font-size: 18px;
  font-weight: 500;
  font-family: roboto;
  padding: 12px;
  margin: 12px;
  color: white;
`
const NewButton = styled.button`
height: 44px;
background: #19D9FB;
border-radius: 5px;
border:none;
font-size: 18px;
font-weight: 500;
font-family: roboto;
padding: 12px;
margin:12px
margin-right: 25px;
color: white;
`
const Img = styled.img`
    border-radius: 50%;
    margin-left: 15px;
`

const SButton = styled.button`
  margin:50px;
  border: none;
`
const Main = styled.div`
  margin: 30px; 
`
const Span = styled.div`
height: 20px;
width: 281px;
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 30px;
line-height: 20px;
color: #FFFFFF;
`
class TrelloBoard extends PureComponent {
  constructor(){
    super()
    this.state={
      clicked: false,
    }
  }
  componentDidMount() {
    // set active trello board here
    const { boardID } = this.props.match.params;

    this.props.dispatch(setActiveBoard(boardID));
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };
  handleBucket =()=>{
    this.setState({clicked: !this.state.clicked})
  }
  render() {
    const { lists, cards, match, boards } = this.props;
    const { boardID } = match.params;
    const board = boards[boardID];
    if (!board) {
      return <p>Board not found</p>;
    }
    const listOrder = board.lists;

    return (
     
      <DragDropContext onDragEnd={this.onDragEnd}>
        <StyledNav className="navbar navbar-expand-lg navbar-light bg-light">    
        <div style={{color: "white", fontFamily: "roboto", fontWeight:"700", fontSize:"2rem", padding: "0 1rem 0 3rem", display:"flex"}}>
     
        {board.title}
         <Img src={require("./assets/image1.png")}/>
        <Img src={require("./assets/image2.png")}/>
        <Img src={require("./assets/image3.png")}/>
        <Img src={require("./assets/image4.png")}/>
        <Img src={require("./assets/image5.png")}/>
        <Img src={require("./assets/image6.png")}/>
    
        </div>
        <div style={{justifyContent:"flex-end"}}>
       <Button><img src={require("./assets/star.png")}/></Button>
       <Button className="align-self-center"><img src={require("./assets/calendar.png")}></img>  Calendar</Button>
       <Button className="align-self-center"><img src={require("./assets/globe.svg")}></img>  Public</Button>
       <NewButton className="disabled align-self-center" onClick={this.handleBucket}> + New Bucket</NewButton>
      </div>
</StyledNav>
        <Main>
        {this.state.clicked && <SButton><TrelloCreate list/></SButton>}
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <>
            <ListsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listOrder.map((listID, index) => {
                const list = lists[listID];
                if (list) {
                  const listCards = list.cards.map(cardID => cards[cardID]);

                  return (
                    <TrelloList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                    />
                  );
                }
              })}
              {provided.placeholder}

            </ListsContainer>
            </>
          )}
        </Droppable>
        </Main>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards
});

export default connect(mapStateToProps)(TrelloBoard);
