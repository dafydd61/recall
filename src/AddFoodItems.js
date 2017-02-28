import React, { Component } from 'react';

class AddFoodItems extends Component {

	constructor() {
		super();
		this.renderFoodItem = this.renderFoodItem.bind(this);
	}

	createFoodItem(e) {
		e.preventDefault();
		const foodItem = this.foodItem.value;
		const foodIds = Object.keys(this.props.foods);
		this.props.addFoodItem(foodIds.length, foodItem);
		this.foodItem.value="";
		this.foodItem.focus();
	}

	removeFoodItem(e, key) {
		e.preventDefault();
		this.props.removeFoodItem(key);
	}

	renderFoodItem(key) {
		return(
			<li key={key}>{this.props.foods[key]} <a onClick={(e) => this.removeFoodItem(e, key)} className="removeFoodItem">&times;</a></li>
		)
	}

	render() {
		const foodIds = Object.keys(this.props.foods);
		return (
			<div className="AddFoodItems">
				<ul className="food-item-list">
					{foodIds.map(this.renderFoodItem)}
				</ul>
				<div className="form-controls--inline">
				  <input ref={(input) => this.foodItem = input} type="text" id="newFoodItem" name="food" placeholder="Add some food" />
				  <button className="btn btn--add" onClick={(e) => this.createFoodItem(e) }>+</button>
				</div>
			</div>
		)
	}
}

export default AddFoodItems;