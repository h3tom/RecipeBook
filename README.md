# Recipe Book
###### #Angular #TypeScript #Bootstrap

Frontend for Recipe Book application, deployed on [firebase](https://hetom-recipebook.firebaseapp.com). Secured with JSON Web Token (in ver. 2). 

User credentials:
+ username/email: tester
+ password: testtest

Link to [backend](https://github.com/h3tom/RecipeBookBackend).

#### Ver 2.0

Major changes:
+ Added authorization and security with JSON Web Token
+ Created new component for authorization
+ Created authorization interceptor and guard
+ Created new user model

TODO:
+ Add unit of measure to ingredients
+ Edit/Delete only users recipes
+ User page (edit/delete user)
+ Maybe add catogories
+ Pagination

#### Ver 1.0 (till 02.02.2020)

Simple frontend without authorization. Everyone can add/edit/delete recipes.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
