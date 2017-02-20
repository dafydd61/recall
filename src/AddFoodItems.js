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
	}

	renderFoodItem(key) {
		return(
			<div key={key}>{this.props.foods[key]}</div>
		)
	}

	render() {
		const foodIds = Object.keys(this.props.foods);
		return (
			<div className="AddFoodItems">
				{foodIds.map(this.renderFoodItem)}
				<div className="form-controls--inline">
				  <input ref={(input) => this.foodItem = input} type="text" name="food" placeholder="Food" />
				  <button className="btn btn--add" onClick={(e) => this.createFoodItem(e) }>+</button>
				</div>
			</div>
		)
	}
}

export default AddFoodItems;