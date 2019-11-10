import shuffle from 'lodash/shuffle';
import sortBy from 'lodash/sortBy';
import orderBy from 'lodash/orderBy';
import colors from '../helpers/colors';

export const TOP = 5;
export const CHOICESIZE = 5;

// generate empty lookup dataset
const lookupTable = colors.map((name, id) => {
  return {
    id,
    name,
    beaten: 0,
    testPriority: 0,
    betterThan: [],
    worseThan: [],
    versusLog: [],
    random: Math.random(),
  };
});

// write testpriority to lookup
const evalTestPriorities = () => {
  lookupTable.forEach((v, k) => {
    lookupTable[k].testPriority = v.versusLog.length;
  });
};

// look at past results and simulate a versus scenario
// based on past answers.
// ie. If 3 beat 1, and 2 beat 3, therefore 2 also beat 1.
const evalResultsThroughAssociation = () => {
  lookupTable.forEach((v1, k1) => {
    lookupTable.forEach((v2, k2) => {
      if (k1 !== k2) {
        if (k1 < k2) {
          predictor(v1, v2);
        }
      }
    });
  });
};

const predictor = (foe1, foe2) => {
  if (foe1.versusLog.indexOf(foe2.id) !== -1) return;

  const foe1BetterThan = foe1.betterThan;
  const foe1WorseThan = foe1.worseThan;
  const foe2BetterThan = foe2.betterThan;
  const foe2WorseThan = foe2.worseThan;

  if (foe1BetterThan.length + foe1WorseThan.length === 0) return;
  if (foe2BetterThan.length + foe2WorseThan.length === 0) return;

  // check foe1 has defeated anyone that foe2 has lost against
  const foe1DefeatFoe2 = foe1BetterThan.some(k => {
    return foe2WorseThan.indexOf(k) !== -1;
  });

  // check foe2 has defeated anyone that foe1 has lost against
  const foe2DefeatFoe1 = foe2BetterThan.some(k => {
    return foe1WorseThan.indexOf(k) !== -1;
  });

  if (foe1DefeatFoe2 !== foe2DefeatFoe1) {
    if (foe2DefeatFoe1 === true) {
      addToWinLose(foe2.id, foe1.id);
    } else {
      addToWinLose(foe1.id, foe2.id);
    }
  }
};

// Evaluate what question to ask next
export const getChoicesFromLookupTable = () => {
  // Orders choices.
  let initBuild = orderBy(
    lookupTable.filter(v => v.beaten < TOP),
    ['beaten', 'testPriority', 'random'],
    ['desc', 'asc', 'asc']
  );

  initBuild.forEach((v1, k1) => {
    const idCompare = initBuild[k1].id;
    initBuild.forEach((v2, k2) => {
      if (k1 !== k2) {
        const foo = initBuild[k2]['versusLog'].indexOf(idCompare);
        if (foo !== -1) {
          delete initBuild[k2];
        }
      }
    });
  });

  initBuild = initBuild.filter(v => v !== null);
  return initBuild.slice(0, CHOICESIZE);
};

export const getLookupTable = () => {
  return lookupTable;
};

// Write win/lose scenario to lookup table
const addToWinLose = (superiorId, inferiorId) => {
  lookupTable.forEach((v, k) => {
    if (v.id === superiorId && lookupTable[k]['versusLog'].indexOf(inferiorId) === -1) {
      lookupTable[k]['betterThan'].push(inferiorId);
      lookupTable[k]['versusLog'].push(inferiorId);
    }
    if (v.id === inferiorId && lookupTable[k]['versusLog'].indexOf(superiorId) === -1) {
      lookupTable[k]['worseThan'].push(superiorId);
      lookupTable[k]['versusLog'].push(superiorId);
      lookupTable[k]['beaten']++;
    }
  });
};

// for testing.
const createRandomAnswers = questionsArray => {
  const shuffled = shuffle(questionsArray);

  const foo = questionsArray.sort((a, b) => (a.id > b.id ? 1 : -1));
  return foo.map(item => item.id);

  return shuffled.map(item => item.id);
};

// accept array of keys in order of preferences
// writes to lookup table
export const processAnswers = answerArrayOfKeys => {
  answerArrayOfKeys.forEach((v1, k1) => {
    answerArrayOfKeys.forEach((v2, k2) => {
      if (k1 !== k2) {
        if (k1 < k2) {
          addToWinLose(v1, v2);
        } else {
          addToWinLose(v2, v1);
        }
      }
    });
  });
};

// Simple helper
export const howManyLeft = () => lookupTable.filter(v => v.beaten < TOP).length;

export const getNextQuestion = () => {
  evalTestPriorities();
  evalResultsThroughAssociation();
  return getChoicesFromLookupTable();
};

const chooser = () => {
  evalTestPriorities();
  evalResultsThroughAssociation();
  //if (howManyLeft() <= TOP) break;

  let questions = getChoicesFromLookupTable();
  // let answers = createRandomAnswers(questions);
  processAnswers(answers);

  console.log(`${x + 1}`, answers);

  const answer = sortBy(lookupTable, 'beaten');
  const filteredAnswers = answer.filter(v => v.beaten < TOP);

  return filteredAnswers;
};
/************************************************************************************** */

export default chooser;
