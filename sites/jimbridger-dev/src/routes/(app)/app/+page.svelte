<main>
   <header>
      <button>Back</button>
      <h1>My Todo</h1>
      <span>&nbsp;</span>
   </header>
   <ul>
      <li><span>Create App Mockup</span><input type="checkbox" checked /></li>
      <li><span>Chat to Braden</span><input type="checkbox" /></li>
      <li><span>???</span><input type="checkbox" /></li>
      <li><span>Profit</span><input type="checkbox" /></li>
   </ul>
   <footer>
      <nav>
         <img src="/app-icons/star.png" alt="star" />
         <img src="/app-icons/message.png" alt="message" />
         <img src="/app-icons/water.png" alt="water" />
         <img src="/app-icons/bookmark.png" alt="bookmark" />
         <img src="/app-icons/menu.png" alt="menu" />
      </nav>
   </footer>
</main>

<style>
   :global(body) {
      margin: 0;
      height: 100vh;
      background-color: lightgrey;
   }

   main {
      font-family: system-ui;
      height: 100%;
      display: grid;
      grid-template-rows: auto 1fr auto;
   }

   header, footer {
      background-color: black;
      color: white;
   }

   header {
      display: grid;
      grid-template-columns: 1fr 5fr 1fr;
      justify-items: center;
      padding: 0.75em 1em;
   }

   h1 {
      margin-block: 0;
   }

   footer {
      padding: 0.5em;
   }

   nav {
      display: flex;
      justify-content: space-around;
   }

   button {
      all: unset;
      font-weight: bold;
      font-size: 1.25rem;
      color: lightgrey;
   }

   ul {
      padding-inline-start: 0;
      padding: 0;
      margin-block: 0;
      background-color: darkgrey;
   }

   li {
      list-style-type: none;
      padding: 1em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.5rem;
      font-weight: bold;
   }

   input {
      aspect-ratio: 1;
      width: 2em;
      /*height: 2em;*/
   }

   li:nth-child(even) {
      background-color: lightgrey;
   }

   img {
      max-height: 64px;
   }
</style>
