import React, { Component } from 'react';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator";
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import SwapiService from "../../services/swapi-service";

import './people-page.css';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 3,
  }

  onItemSelected = (id) => {
    this.setState( {
      selectedPerson: id
    })
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.swapiService.getAllPeople}>

        {(i) => `${i.name} (${i.birthYear})`}

      </ItemList>      
    );

    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails personId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={itemDetails} />
    );
  }
}