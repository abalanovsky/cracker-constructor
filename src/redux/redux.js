import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import {INGREDIENTS, INGREDIENTS_PRICES, SIZE_WEIGHTS} from "../constants";

const DEFAULT_STATE = {
    cracker: {
        peas: {
            value: 0,
            max: 100,
        },
        seeds: {
            value: 0,
            max: 100,
        },
        grain: {
            value: 0,
            max: 100,
        },
        corn: {
            value: 0,
            max: 100,
        },
        price: 0,
        size: "small",
    },
    crackers: [],
    totalPrice: 0,
};

export const setIngredients = createAction("SET_INGREDIENTS");
export const setRemainingPercent = createAction("SET_REMAINING");
export const setSize = createAction("SET_SIZE")
export const addToCart = createAction("ADD_TO_CART")
export const unsetCracker = createAction("UNSET_CRACKER");
export const deleteItem = createAction("DELETE_ITEM");

const calculatePrice = (cracker) => {
    const weight = SIZE_WEIGHTS[cracker.size];
    let price = 0;

    INGREDIENTS.forEach(ingredient => {
        price += (cracker[ingredient].value * weight * INGREDIENTS_PRICES[ingredient]) / 100;
    })

    return price.toFixed(2);
};

const calculateTotal = (crackers) => crackers.reduce((sum, cracker) => sum + Number(cracker.price), 0);

export const reducer = createReducer(DEFAULT_STATE, (builder) => {
    builder
        .addCase(setIngredients, (state, action) => {
            const { ingredientName, value } = action.payload;
            const cracker = { ...state.cracker };
            cracker[ingredientName].value = value > cracker[ingredientName].max ? cracker[ingredientName].max : value;

            const { peas, seeds, grain } = cracker;
            const mainIngredients = [peas, seeds, grain];
            const totalValues = mainIngredients.reduce((partialSum, ingredient) => partialSum + ingredient.value, 0);

            mainIngredients.forEach((ingredient) => {
                ingredient.max = 100 - totalValues + ingredient.value;
            });

            cracker.price = calculatePrice(cracker);
            state.cracker = { ...cracker };
        })
        .addCase(setRemainingPercent, (state) => {
            const { peas, seeds, grain } = state.cracker;
            const mainIngredients = [peas, seeds, grain];
            const totalValues = mainIngredients.reduce((partialSum, ingredient) => partialSum + ingredient.value, 0);
            state.cracker.corn.value = 100 - totalValues;
            state.cracker.price = calculatePrice(state.cracker);
        })
        .addCase(setSize, (state, action) => {
            state.cracker.size = action.payload;
            state.cracker.price = calculatePrice(state.cracker);
        })
        .addCase(addToCart, (state) => {
            const { peas, seeds, grain, corn, price, size } = state.cracker;
            const weight = SIZE_WEIGHTS[size];

            const cartItem = {
                id: Date.now().toString(),
                peas: peas.value,
                seeds: seeds.value,
                grain: grain.value,
                corn: corn.value,
                price,
                weight,
            };

            state.crackers.push(cartItem);
            state.totalPrice = calculateTotal(state.crackers);
        })
        .addCase(deleteItem, (state, action) => {
            state.crackers = state.crackers.filter(({ id }) => id !== action.payload);
            state.totalPrice = calculateTotal(state.crackers);
        })
        .addCase(unsetCracker, (state) => {
            state.cracker = { ...DEFAULT_STATE.cracker };
        });
});

export const store = configureStore({ reducer });
