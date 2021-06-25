import './App.css';
import TrelloList from './components/Trellolist';
import { connect } from "react-redux";
import { StylesProvider } from '@material-ui/core';

function App({lists}) {

  return (
    <div className="App">
        <div style={styles.listsContainer}>
        {lists.map(list=><TrelloList key={list.id} title={list.title} cards={list.cards}/>) }
        </div>
    </div>
  );
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row",
  }
};

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App);