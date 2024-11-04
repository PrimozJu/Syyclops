Welcome to test assignment for Syyclops.

This test is split into 2 sections, React and Python.

# Frontend

Go to `frontend` folder and run:

-   `npm i`
-   `npm run start`

This will open the project in http://localhost:3000/

Preferrably you can use https://tailwindcss.com for styling elements, but feel free to use your own CSS as well if you are not familiar with tailwind.

# Frontend assignment

You will be using a fake JSON response service called DummyJSON - https://dummyjson.com/docs/users. For fetching data you can add [axios](https://axios-http.com/docs/intro) or any other http library.

-   Develop a page which is split into 2 sections: sidebar and main content
-   In the sidebar list 20 users (in the docs you should find how to limit number of users)
-   In the main content section, display the currently selected user (each user in sidebar should be clickable)
    -   Show these fields:
        -   "id", "firstName", "lastName" "age", "gender", "email", "phone"
-   **Bonus**
    -   When user is selected, implement an "Edit functionality", where all of the displayed fields are input and you can change their values. Call the appropriate endpoint (https://dummyjson.com/docs/users#users-update) and update the view with the response from the endpoint
-   **Bonus 2**
    -   Try to match the https://syyclops.com visual identity (colors, logo, etc...)

# Backend assignment

First, you need to create a virtual environment - https://fastapi.tiangolo.com/virtual-environments/

Once you are done, install the required packages:

```
pip install "fastapi[standard]"
```

After this, you can run the server with:

```
fastapi dev main.py
```

Your server should be available at http://127.0.0.1:8000

## Backend tasks

-   Create an endpoint which lists the users same way as DummyJSON does
    -   Endpoint should be available on `/users`
-   Create an `PUT` endpoint, where you can edit specific user based on id. You can find list of users in `users.py` file.
-   **Bonus**
    -   Connect React app to use newly created python endpoints instead of DummyJSON
-   **Bonus 2**
    -   Write tests to ensure everything works properly

If you need help contact me at jan@syyclops.com or anthony.demattos@syyclops.com.

# Implementation instructions/notes

-   Both Frontend and backend have been implemented with all the bonus exercises.
-   On frontend i'd usually use typescript but for this test i used javascript since typescript wasn't installed in the project.
-   on backend I didn't want to modify the users.py file other the firstName so there's not much changes in frontend. However if you switch the API on frontend to call dummyjson you'll see the fields are shown
-   Tests are run on backend only, using pytest, go to the backend folder and run `pytest test_main.py` to run the tests.
-   Also added the delete functionality since it was easy to implement.
-   Would also add Create user functionality but I'd have to use react router to redirect to a new page to create a user (UX would be pretty bad if everything was in home.js). Since it wasn't in the assignment I choose not to implement it.
-   Left all the commponents inside src folder for simplicity's sake. Otherwise split to pages and components folders.
-   Used CSS for some styles as I'm more familiar with it. Used tailwind for more straightforward styles
-   Since the backend is running on localhost:8000 and frontend on localhost:3000, you'll have to enable CORS on the backend to allow the frontend to make requests to the backend. I've already added the middleware to the backend to allow requests from localhost:3000.
