# BeanBakers Fullstack Code Challenge

## Your challenge

Your challenge is to build a simple fullstack web application which can be used to send and receive messages between its users, using any language, tools or technologies of your choice. You are welcome to use existing framworks or other tools as you like, so long as the code responsible for the business logic and frontend is your own. There is no need or expectation to reinvent any wheels.

You can choose how much emphasis you place on the backend and frontend respectively, as long as at least the MVP (level 1) requirements are met, but the application should nevertheless be usable from a standard modern browser, beyond that you can make your backend or frontend as fancy or simple as you like.

You are welcome to also add additional features, but be veary of feature creep. As you should know, sometimes less is more.

The detailed assignment and requirements are listed below, mark all requirements that you have fulfilled with a checkmark (`[x]`). If you were only partially able to fulfill one of the requirements, you should leave them unchecked but mention them in the section for additional features or remarks instead with more details.

### Level I: MVP Requirements

Implement a simple messaging web app where you can send public text based messages to other users.

The below list contains the minimum requirements that must be met.

- [x] The code (comments, variable and function names etc.) is in English
- [x] Each user is identified by a screen name.
- [x] You can send messages to users by creating a named group (like an inbox, with public name).
- [x] Users can read the messages in a given group by knowing the name of the group (no passwords required here, keep it simple).
- [x] The contents of a given group must be stored somewhere persistent (real time delivery is not required).

### Level II: Secure Messaging (Advanced)

In order to improve overall privacy and security, even if someone has access to the raw stored data, e.g. a database dump, they may NOT be able to retrieve the following information.

These are additional requirements, and you may choose to implement all, none, or only a subset of them. you may need to extend some of the Level I requirenments for reading and sending messages to be able to implement all of these.

- [x] Which users there are (the screen names).
- [x] Which groups there are (the names).
- [x] Who sent messages to which group.
- [x] What the messages are (their text content).
- [x] How many messages are there on average per user and/or group.
- [x] Information needed to successfully join a group uninvited (access to this info would bypass the previous requirements)

### Additional Remarks or Feautres

Front end utilizes React, while backend is written pure JavaScript.

The sites provides user the option to register and loggin, granting them a username, which they will be identified by when using the entering chat.

Registration and logging is not required, but the user may use the chat without, in which case they will be identified as "visitor".

When the user submits the name of the chat groups and presses "join", they will join a chat group and shown all its previous messages, but if the chat group does not exist, a new chat group is automatically created.

The project uses socket.io to connect to the front and backend, compiled by Railway Cli. The backend connects to MongoDB hosted by Railway Cli.

Everything that is stored in the database is encrypted using 16-character key, therefore without the key access to the database is worthless.

In order to utilize the enrypted data, the backend server will decrypt the cursor using its key.

Database structure works like this:

user_accounts (database);
*  usernames (collection)
*  passwords (collection)
*  forenames (collection)
*  surnames  (collection)
*  user_ids (collection)

chats (database);
* groups (collection)
* messages (collection)

## Running the application


Live demo is available at: https://reviewsite-production.up.railway.app/
Additionally, localhost can be accessed by changing reviewsitebackend-production.up.railway.app to localhost:8080 in frontend's App.js, and backend's index ws:reviewsite-production.up.railway.app:3000 to ws:localhost:3000

