# Yingo

Inspired by [@Pieosaurus3's tweet](https://twitter.com/Pieosaurus3/status/1684781240405151744) and Jacksfilms' take on SSSniperwolf's content. This bingo game is crafted for fans who love a comedic spin on classic reaction videos. Watch, laugh, and mark off those iconic moments as they happen. A perfect companion for binge-watching sessions.

Thought I'd make this for fun as a side project and bring it to the fans. This is just a very basic version of what this can be, so if there are features that people want to see, I'm all for it. If people want to contribute as well, let's do it.

## Usage

How to play and join games

1. Creating a game is as simple as clicking create game. This will generate a share game link which will allow other players to join your game with their own unique board

2. Joining a game. This is as simple as pasting the link shared with you. Going to the link will automatically create a board for you using the same set of terms in that game

3. Sharing a board. It's important that you click copy as that is how the server will know which spots you have marked. Once you click copy and  the other player paste your link, they'll see your exact board as well as the spots that you have clicked.

Demo

![Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWR5b29oaWRzNTh4bHJ4a3I5Y2kzaHRhZ3ppaTJxZXluc2xuZzFxcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H6FAc1xxlRS6qxWvga/giphy.gif)
## Installation

How to install and set up your project.

```bash
git clone https://github.com/EmperorJean/Yingo.git
# For server
cd yingo-server
npm i
npm run dev
# For client
cd yingo-client
python -m http.server 3001
# Should be live at http://localhost:3001/
```

.env preview
```
DATABASE_CONNECT_URL=               # Mongo db url
PORT=                               # Port for server to listen from
DB_NAME=                            # Name of ur db
WINDOWMS=                           # Time 
MAX=                                # Number of requests allowed in that time 
```
## Note

This is just a side project I'm doing while pursuing my degree so expect that to come first, however, feature reqs and bugs will not go unfixed. Just don't expect overnight patches. Also no battlepass/microtransactions unless we get acquired by a modern day AAA publisher 😆

Also note that this is a very early version of it and the possibilites are endless. Some things currently in mind are youtuber list so this can apply to many youtubers and a request button to have users add their own traits for that youtuber to create more unique boards. Even the possibility to have the user upload their own stuff for their specific game. 