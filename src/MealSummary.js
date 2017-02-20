import React, { Component } from 'react';

class MealSummary extends Component {
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
					<p>Last time you ate here, you had:</p>
					<ul className="MealSummary__foods-list">
						{Object.keys(meal.foods).map((key) => {
							return(
								<li key={key}>{meal.foods[key]}</li>
							)
						})}
					</ul>
					<p>Your BG was {meal.bgLevel} and {meal.bgMotion}.</p>
				</div>
			)
		}
	}
}

export default MealSummary;