import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      const res = await fetch("YOUR_API_HERE");

      if (!res.ok) {
        throw new Error("Something went Wrong...");
      }
      const data = await res.json();

      const loadedData = [];

      for (const key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedData);
      setIsLoading(false);
    }
    fetchMeals().catch((error) => {
      setHttpError(error.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading....</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.Error}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
