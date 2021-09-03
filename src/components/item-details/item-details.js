import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
// import Spinner from "../spinner";

import "./item-details.css";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
  )
}

export {
  Record
};

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

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        })
      })
  }

	render() {
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

    const {item, image} = this.state

    if (!item) {
      return null
    }
    
    const { id, name, gender, birthYear, eyeColor } = item;

		return (
			<div className="item-details card">
				<img className="item-image"
						 src={image}
             alt={name}/>

				<div className="card-body">
					<h4>{name}</h4>
					<ul className="list-group list-group-flush">
						{ 
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
					</ul>
				</div>
			</div>
		);
	}
}