# 05-Oct-2024
- Created the initial application using expo, interesting that created the application as a sub folder of the `react` folder I created to the application... I can live with that 😊
- First fork in the road! what UI library to use, talking to the oracle got to some candidates React Native Paper and NativeBase, to avoid me choosing dying technologies again... Yeap Herval, I am learning hahaha, did some digging on researches https://results.2023.stateofreactnative.com/component-libraries/ and what a surprise React Native Paper is widely used. I guess I have a champion.
- Ops the boilerplate application created from Expo is really complicated, at least for now, will wipe it and restart with React Native Paper.. Maybe there are some boilerplates WITH React Native Paper
- This looks like a good one https://github.com/youzarsiph/expo-react-native-paper, another very complicated boiler plate, will keep as reference on practices but will start from scratch.

## Weird json output 
```
{
    "id": "ceb80aca-275b-4471-8bfc-4b9f62c967a8",
    "createdAt": "2024-10-06T00:15:06.819Z",
    "runtimeVersion": "exposdk:51.0.0",
    "launchAsset": {
        "key": "bundle",
        "contentType": "application/javascript",
        "url": "http://127.0.0.1:8081/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&hot=false&transform.engine=hermes&transform.bytecode=true&transform.routerRoot=app"
```
- When trying to load the application on `http://localhost:8081` the output was an JSON content, after reading it found that its the expo application details that are exposed in that URL 😁 so ready to be consumed by the mobile app if I am in the same WI-FI, after starting the web, that I had to install some packages as well I was able to load the web application. 🎆🎆🎆🎆

```
› Web is waiting on http://localhost:19006
```

## TS works sometimes

Found this when opening tsconfig.json
```
Cannot find type definition file for 'prop-types'.
  The file is in the program because:
    Entry point for implicit type library 'prop-types'
```

`npm install @types/prop-types --save-dev` did not fix it

Changing tsconfig.json to point to the right folders

```
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
``` 

Still have this issue when opens App.tsx `Cannot find module 'expo-status-bar' or its corresponding type declarations.ts(2307)`, can it be missing types?

💀 Only after a clear restart of vscode the error stopped, ok ok typescript compiler you needed some time, I got it.


``` 
npm install react-native-paper
npx expo install react-native-vector-icons react-native-safe-area-context
``` 

Humm first page component... so far so good how to show the message as a modal?

# 06-Oct-2024

## Time to do some page navigation, AKA push to the stack!

```
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
```

Here we go again, react navigation feels a little convoluted ad first glance, let's hear what the community says... https://results.2023.stateofreactnative.com/navigation/ oh well lot of people using it, but expo-router is growing, why? HA! expo-router uses file based routing, so the message is follow a standard, e.g. save in a folder named `app` and you are good, probably the reason for some `_XXX` files I saw in the examples, good pattern... 😊🔥

```
npx expo install expo-router
```
I think the chatgpt conversation got saturated, when comparing the guidance to expo route seems far from the example apps I have, let me take a look at the docs https://docs.expo.dev/router/installation/#quick-start, maybe is time for cursor? The feature to tag documentation to use as reference seems to be THE key to expedite the learning proces.

## expo-router install 

```
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

> For the property main, use the expo-router/entry as its value in the package.> json. The initial client file is app/_layout.js.


WAT? https://docs.expo.dev/router/installation/#modify-project-configuration
ok skipping this step, no idea what this is 😁😁

```
npx expo install react-native-web react-dom
```



