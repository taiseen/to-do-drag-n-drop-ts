> 11 - Jun - 2022

# React + TypeScript 

## Build it just for practice of Type-script with React...

# Side Dependencies...

|No| Package Installs                       | Use for...                        |
|--|----------------------------------------|-----------------------------------|
|1 | yarn add `gh-pages`                    | git hub page builder              |
|2 | yarn add `react-beautiful-dnd`         | element drag & drop               |
|3 | yarn add `@types/react-beautiful-dnd`  | type checking for dnd lib...      |


<br/>

```
yarn add gh-pages	

==> Publish to a gh-pages branch on GitHub
```


```
"scripts": {
    "predeploy": "yarn build",
    "deploy": "gh-pages -d build"
},
```


```
"homepage" : "https://taiseen.github.io/to-do-drag-n-drop-ts",
```


```
yarn deploy
```
