# Anecdotes yandex alice skill

Skill for Yandex.Station which represents anecdotes from own sources

## Install

Clone repo
```
git clone https://github.com/4llower/actual-age-extension.git
```
Install dependencies (in root directory)
```
yarn
```
Initialize ```.env``` by the ```.env.example```
```
APP_ID=
APP_API_HASH=
SESSION_STRING=
```
*Session string needed for scripts (use own credentials: appId, apiHash, phone number)
```
npx tgsession
```
*For firebase connection you need to provide firestore access https://firebase.google.com/docs/firestore/security/get-started

*After getting json you need change path in package.json ```GOOGLE_APPLICATION_CREDENTIALS="/home/firebase.json"``` on yours or mount it to docker container

### To load anecdotes from other sources

In file ```uploadJokesToFirebase.ts``` you need change source in constructor:
```javascript 
const telegramParser = new TelegramParser('myfavoritejumoreski')
```
