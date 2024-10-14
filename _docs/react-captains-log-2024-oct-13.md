# migrating the existing angular app to react, step by step notes

## add daisy and update the home page 

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
