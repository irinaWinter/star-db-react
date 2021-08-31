import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

import "./item-details.css";

export default class ItemDetails extends Component {

  swapiService = new SwapiService()

  state = {
    item: null,
    image: null
  }

  componentDidMount() {
    this.updateItem();
    
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem()
    }
  }

  // onError = () => {
  //   this.setState({
  //     error: true,
  //     loading: false
  //   })
  // }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        })
      })
  }

	render() {
    const { item, image } = this.state;
    if(!item) {
      return <span>Select a item from list</span>;
    }

    // const { loading, error } = this.state
    // const spinner = loading && !item ? <Spinner /> : null;
    // const message = !item && loading ? <span>Выберите</span> : null;

    // if (loading) {
    //   return <span>{spinner}{message}</span>
    // }

    // const hasData = !(loading || error)
    
    // if (!hasData) {
    //   return null
    // }
    
    // if (this.state.loading) {
    //   return <div className="item-details card">{spinner}</div>
    // }

    const { id, name, gender, birthYear, eyeColor } = item;

		return (
			<div className="item-details card">
				<img className="item-image"
						 src={image}
             alt={name}/>

				<div className="card-body">
					<h4>{name} {id}</h4>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<span className="term">Gender</span>
							<span>{gender}</span>
						</li>
						<li className="list-group-item">
							<span className="term">Birth Year</span>
							<span>{birthYear}</span>
						</li>
						<li className="list-group-item">
							<span className="term">Eye Color</span>
							<span>{eyeColor}</span>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}