const fetch = require('node-fetch');

import { SecretConstants } from "./SecretConstants";
import { Mailer } from './Mailer';
import { Log } from './Log';

const user = 'GeekyAnts';
const repo = 'NativeBase';
const alertStarCount = '9998';
const alertSentTo = 'theapache64@gmail.com';

const lastStarCount = Log.getLastStarCount();

const url = `https://api.github.com/repos/${user}/${repo}?client_id=${SecretConstants.CLIENT_ID}&client_secret=${SecretConstants.CLIENT_SECRET}`;

fetch(url)
    .then((resp: any) => resp.json())
    .then((json: any) => {
        const currentStarCount = json.stargazers_count;
        if (currentStarCount >= alertStarCount) {
            if (lastStarCount !== currentStarCount) {

                // Sending mail
                Mailer.sendMail(alertSentTo, currentStarCount, () => {
                    Log.setLog(`{"last_star_count": ${currentStarCount}}`)
                });

            } else {
                console.log(`Star count of ${currentStarCount} already reported!`);
            }
        } else {
            console.log('Keep calm ;)');
        }
    })
    .catch((error: any) => {
        console.log('ERROR: ', error);
    })

