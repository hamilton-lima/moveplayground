# migrating the existing angular app to react, step by step notes

## error when navigating to /about 💀

```
Unhandled Runtime Error
Error: Hydration failed because the initial UI does not match what was rendered on the server.
See more info here: https://nextjs.org/docs/messages/react-hydration-error

Expected server HTML to contain a matching <html> in <div>.

<MyApp>
  <RootLayout>
    <html>
``` 

Oh wow, it seems that everything was mixed ... https://nextjs.org/docs/app/building-your-application/routing
BAD ChatGPT, BAD ChatGPT...

Claude gave a way clear answer, fixing the issues from the other oracle...
- every folder under app is a node in the path, e.g. app/about = /about in the navigation
- `layout.tsx` will be used by the current folder and its children
- every folder with `page.tsx` will render that component

## create code context to ask questions to ChatGPT

usefull component to give context to chatgpt when asking for help
https://github.com/buimanhtoan-it/combine-code-in-folder
select multiple files-> Combine code to clipboard 🔥

## random notes
- library of daisy layouts https://components.willpinha.link/
- `public` is the folder to save images, convention over configuration!!

## Create layout component 

creating components as functions() skips the default children and the different way of creating a function as a constant and then exporting the constant 
`const Layout: React.FC<LayoutProps> = ({ children }) => {` 

Naming a function as the component seems more readable 
`function Layout({ children }: LayoutProps) {`

### components need to return the content 

WRONG 
export default function Layout({ children }: LayoutProps) {
    <div>
      <header>Header Content</header>
      <main>{children}</main>
      <footer>Footer Content</footer>
    </div>
}

RIGHT
export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header>Header Content</header>
      <main>{children}</main>
      <footer>Footer Content</footer>
    </div>
  );
}

💀💀💀💀💀
```
The following tags are missing in the Root Layout: <html>, <body>.
Read more at https://nextjs.org/docs/messages/missing-root-layout-tags
```


## add daisy

all tailwind dependencies are in place... good

npm install daisyui

add daisy to tailwind 
```
// tailwind.config.js
module.exports = {
    ...
  plugins: [require('daisyui')], // Add DaisyUI plugin here
};
```

ahhh class -> className 🔥🔥




## empty page

npx create-next-app@latest nextjs-app
cd nextjs-app
npm run dev


Way too many questions 😁
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes 💀
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias (@/*)? … No / Yes 💀

Can I change later? I hope so, accepted the default

Cool, empty page is loaded!
