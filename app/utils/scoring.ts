import { questions } from "../data/questions";
import { personalityTypes } from "../data/personalities";

export function getPersonalityType(answers: number[]) {
  const scores = {
    EI: 0, // Extroversion vs Introversion
    SN: 0, // Sensing vs Intuition
    TF: 0, // Thinking vs Feeling
    JP: 0, // Judging vs Perceiving
  };

  // Calculate scores for each dimension
  answers.forEach((answer, index) => {
    const question = questions[index];
    const score = answer * question.direction;
    scores[question.dimension] += score;
  });

  // Determine personality type based on scores
  const type =
    (scores.EI > 0 ? "E" : "I") +
    (scores.SN > 0 ? "N" : "S") +
    (scores.TF > 0 ? "F" : "T") +
    (scores.JP > 0 ? "P" : "J");

  return personalityTypes[type];
}
