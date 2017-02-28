import React, { Component } from 'react';

class MealSummary extends Component {

	bgReview(time) {
		const meal = this.props.meals[this.props.mealId];
		let timeString;
		if (time === 'pre') {
			timeString = 'Before you ate';
		} else if (time === 'post2') {
			timeString = '2 hours later';
		} else {
			timeString = '4 hours later';
		}
		if (meal.bgTrend[time] !== '') {
			return (
				<p>{timeString}, your blood glucose was {meal.bgLevel[time]} and {meal.bgTrend[time]}.</p>
			)
		} else {
			return (
				<p>{timeString}, your blood glucose was {meal.bgLevel[time]}.</p>
			)
		}
	}

	render() {
		const mealId = this.props.mealId;
		const meal = this.props.meals[mealId];
		if (mealId === '0') {
			return (
				<div className="MealSummary">
					<p>You haven't eaten here before.</p>
				</div>
			)
		} else {
			return (
				<div className="MealSummary">
					<div className="form-content">
						{/*<h3><a href="#" className="reveal" onClick={(e) => this.reveal(e, 'MealSummary__food-item-list')}>What you ate</a> <FontAwesome className="fa-caret-right" name="reveal" /></h3>*/}
						<h3>What you ate</h3>
						<ul id="MealSummary__food-item-list" className="food-item-list reveal__target">
							{Object.keys(meal.foods).map((key) => {
								return(
									<li key={key}>{meal.foods[key]}</li>
								)
							})}
						</ul>
						<h3>How it went</h3>
						{this.bgReview('pre')}
						<p>You bolused {meal.bolus} units of insulin.</p>
						{this.bgReview('post2')}
						{this.bgReview('post4')}
					</div>
					<div className="form-nav">
						<button onClick={(e) => this.props.useMeal(e, mealId)}>Use this meal</button>
					  <button onClick={(e) => this.props.nextScreen(e, 'add-meal__food', 'newFoodItem')}>New Meal</button>
					</div>
				</div>
			)
		}
	}
}

export default MealSummary;