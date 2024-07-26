import { useWindowDimensions } from "react-native";

const {height, width} = useWindowDimensions();


const h1 = height * 0.1;
const h2 = height * 0.08;
const h3 = height * 0.06;
const h4 = height * 0.05;

export default {h1, h2, h3, h4}