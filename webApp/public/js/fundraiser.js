import {getDataFromCrowdfundingDb} from './fetchDb.js';
getDataFromCrowdfundingDb(`http://localhost:3060/api${window.location.pathname}`, 'data')