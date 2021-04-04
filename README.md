[<img src="https://i.imgur.com/a856gth.png" width="400" />](https://web2solutions.github.io/voodux/code/index.html)


#   VooduX && React Tic Tac Toe game

The notorious Tic Tac Toe React game using [voodux](https://github.com/web2solutions/voodux) as it underlying architecture to handle it data.

It provides a Rank of all matches.

All data is saved offline.

This demo focus on `React functional components` using Context API.



`This project was NOT bootstrapped with Create React App.`


### Demo app

[Check the online demo](https://voodux-react-tic-tac-toe.vercel.app/)


<img src="https://media-exp1.licdn.com/dms/image/sync/C4D27AQEWC6NX-ObG_g/articleshare-shrink_1280_800/0/1617500184264?e=1617588000&v=beta&t=bTI5Xb85ULi3VftAh809HdWWdeF8jayLlzRJVxXlnLg" width="600" />





### voodux Docs

[Project](https://github.com/web2solutions/voodux)


[Code Documentation](https://web2solutions.github.io/voodux/code/index.html)



### Code automation tools


- `npm run start:dev`

  Starts the dev server at 5492 port

- `npm run build`

  Build the application inside `dist/` folder

  1. Runs `npm run lint`
  2. Runs `npm run webpack`

- `npm run doc`

  Generates the code documentation using JSDoc

- `npm run lint`

  Runs lint against the code at src/ folder

- `npm run eslint-fix`

  Runs eslint --fix against the code at src/ folder

- `npm run format-code`

Runs prettier-eslint --write against the code at src/ folder

- `npm run webpack`

Transpile the es6 code (src/) to es5 version at dist/ folder
