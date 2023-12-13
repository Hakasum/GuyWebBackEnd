import Writing from "models/Writing";

function getAllWritings() {
    return Writing.find().exec();
}