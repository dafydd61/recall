import React, { Component } from 'react';

class MealSummary extends Component {

	bgReview(time, meal) {
		// const meal = this.props.meals[this.props.mealId];
		let timeString;
		if (time === 'pre') {
			timeString = 'Before you ate';
		} else if (time === 'post2') {
			timeString = '2 hours later';
		} else {
			timeString = '4 hours later';
		}

		if (meal.bgLevel[time] !== '') {
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
	}

	bolus(meal) {
		let comboString = '';
		if (meal.combo !== '') {
			comboString = `, using a ${meal.combo} combination`;
		}
		return (
			<p>You bolused {meal.bolus} units of insulin{comboString}.</p>
		)
	}

	render() {
		const mealId = this.props.locations[this.props.currentLocation].lastMeal;
		const meal = this.props.meals[mealId];
		if (mealId === '0') {
			return (
				<div className="MealSummary">
					<div className="form-content">
						<p>You haven't eaten here before.</p>
					</div>
					<div className="form-nav">
						<button onClick={(e) => this.props.hideMealSummary(e)}>Cancel</button>
					  <button onClick={(e) => this.props.createCurrentMeal(e)}>New Meal</button>
					</div>
				</div>
			)
		} else {
			return (
				<div className="MealSummary">
					<div className="form-content">
						<h3>What you ate</h3>
						<ul id="MealSummary__food-item-list" className="food-item-list reveal__target">
							{Object.keys(meal.foods).map((key) => {
								return(
									<li key={key}>{meal.foods[key]}</li>
								)
							})}
						</ul>
						<h3>How it went</h3>
						{this.bgReview('pre', meal)}
						{this.bolus(meal)}
						{this.bgReview('post2', meal)}
						{this.bgReview('post4', meal)}
						<h3>Notes</h3>
						{meal.notes}
					</div>
					<div className="form-nav">
						<button onClick={(e) => this.props.useMeal(e, mealId)}>Use this meal</button>
					  <button onClick={(e) => this.props.createCurrentMeal(e)}>New Meal</button>
						<button onClick={(e) => this.props.hideMealSummary(e)}>Cancel</button>
					</div>
				</div>
			)
		}
	}
}

export default MealSummary;