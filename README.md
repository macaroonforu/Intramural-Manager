# SPORT-CRUD
Sport Crud that will be created with Express, MongoDB, and Pug 

15-Aug-2023
1. ran express SPORT-CRUD view=pug
2. modified scripts section in package.json to this: 
```javascript
"scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www",
    "serverstart": "DEBUG=SPORT-CRUD:* npm run devstart"
  }
```
3. Changed all vars to const 
4. npm install mongoose
5. Created sport, coach, player, and team models (and model folder)
6. Wrote test script (populateddb) to populate the database and verfied that it was working. 
7. npm-install express-async-handler
8. Created sport, coach, player, and team controllers (and controller folder)
9. Created routes/home.js
10. Updated index.js to redirect it to home on load 
11. Update app.js to import home.js as a router and use this router. 


16-Aug-2023
1. Wrote home.js
2. Tried to do a responsive nav bar for layout.pug

17-Aug-2023
1. Wrote views to display lists of coaches, teams, players, and sports. 
2. modified script because I realized I was missing a name property for team db object. 