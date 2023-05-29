# Oxolo frontend application

- Created by ReactJs ( TypeScript)
- Using .env for configuration
- Using tanStack library for query and mutations
- Using Mui/material librbary for UI tools

# Project description

There are 2 pages in this project, first for modify and position text element and the second page for showing history of changes.
You can access them via following menus:

1-Player

In this page, after text modifications and pressing Enter, The information will be sent to server and will be stored in database. We keep the history of all changes so in futuer version, we can implement features like Undo/Redo and moving forward the history of changes.

Dragging text elements also will sent information to server, so after dropping, the tex abd position will be saved in database.

2- History

You cab access all history of text and position of text element. in the future, we can add extra fields like color,fontsize and ...

### Folder structure

#### pages

consist of two page of project ( Player nd History)

#### router

Router configuration for managing project pages

#### general

consist of global interface and addresses of backend server

#### components

consist of all components used in project pages

### `npm start`

ّFor running the project, just run following command:

```
npm run start
```

The application will be started at port 3000.

## Stay in touch

- Author - Seyed Mohamed Mahdi AhmadianZadeh
- LinkedIn - [Ahmadianzadeh](https://www.linkedin.com/in/ahmadianzadeh/)
