import {useEffect, useState} from 'react';
import {ScoreType} from './type';

export const useVitalsScores = () => {
  const [painScale, setPainScale] = useState(0);
  const [selectedCGSscoreTab, setSelectedCGSscoreTab] = useState(0);

  const [scores, setScores] = useState<{
    'eye opening score': ScoreType;
    'verbal response score': ScoreType;
    'motor response score': ScoreType;
  }>({
    'eye opening score': null,
    'motor response score': null,
    'verbal response score': null,
  });

  const [totalScore, setTotalScore] = useState(0);
  const updateScores = (field: string, value: object) => {
    setScores({...scores, [field]: value});
  };

  const handleAddPointToScore = ({
    score,
    text,
    field,
  }: {
    score: number;
    text: string;
    field:
      | 'eye opening score'
      | 'verbal response score'
      | 'motor response score';
  }) => {
    updateScores(field, {score, text});
  };
  const getTotalScore = () => {
    let totalScore = 0;

    Object.values(scores).forEach(score => {
      if (score) {
        totalScore += score.score;
      }
    });

    return totalScore;
  };
  useEffect(() => {
    setTotalScore(getTotalScore());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scores]);

  return {
    painScale,
    setPainScale,
    selectedCGSscoreTab,
    setSelectedCGSscoreTab,
    scores,
    setScores,
    totalScore,
    setTotalScore,
    updateScores,
    handleAddPointToScore,
    getTotalScore,
  };
};
