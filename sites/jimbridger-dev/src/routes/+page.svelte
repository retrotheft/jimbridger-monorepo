<script lang="ts">
</script>

<main id="home">
   <section id="header">
      <article id="me">
         <h1>Jim Bridger</h1>
         <p>Open-Source Developer</p>
         <p>Obsessed with elegant software architecture and minimal APIs.</p>
      </article>
   </section>
   <section id="content">
      <section id="blurb">The blurbiest blurb that ever blurbed</section>
      <section id="recent">
         <h2>Recent Activity</h2>
         <dl>
            <dt>Jan 30, 2026</dt>
            <dd>Making my site!</dd>
         </dl>
      </section>
      <section id="footer">Footer</section>
   </section>
</main>

<style>
   main#home {
      display: flex;
      flex-wrap: wrap;
      justify-content: stretch;
      gap: 0;
      position: sticky;
      /*height: 100vh;*/
   }

   section {
      box-sizing: border-box;
      flex: 1 0 50%;
      min-width: 50ch;
      /*border: 1px dotted grey;*/
      display: grid;
      place-items: center;
      padding: 1em;
      /*align-items: start;*/
      align-content: start;
      position: sticky;
   }

   section#header {
      color: white;
      position: sticky;
   }

   section#content {
      height: 100%;

   }

   section#content > * {
      height: 500px;
   }

   article {
      /*border: 1px dotted lightgrey;*/
      /*border-radius: 1em;*/
      padding: 1em;
      max-width: 40ch;
   }

   article#me {
      position: sticky;
      align-self: start;
      top: 5rem;
   }

   dl {
      display: grid;
      gap: 1em;
      /*border: 1px solid cornflowerblue;*/
      justify-items: start;
      justify-content: start;
      align-content: start;
      grid-template-columns: 1fr 3fr;
   }

   dt {
      text-align: right;
      font-weight: bold;
      color: #aaa;
   }

   dt, dd {
      /*border: 1px solid lightgreen;*/
      display: inline-block;
      width: 100%;
   }

   dd {
      margin: 0;
   }
</style>
