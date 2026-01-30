export const getHtml = (name: string) => `
   <!DOCTYPE html>
       <html lang="en">
       <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <link rel="stylesheet" href="/games/${name}/${name}.css">
       </head>
       <body>
         <div id="app"></div>
         <script src="https://cdn.jsdelivr.net/gh/retrotheft/jimbridger-monorepo@main/cdn/games/${name}.iife.js"></script>
       </body>
       </html>
`
