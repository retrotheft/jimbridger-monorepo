<div class="avatar">
   <img src="jim_avatar_512.png" alt="it me!" />
</div>

<style>
   @keyframes rotate-gradient {
      to {
         --gradient-angle: 0deg;
      }
   }

   div.avatar {
      max-width: 128px;
      aspect-ratio: 1;
      --_color: var(--color, violet);
      --_gradient-angle: var(--gradient-angle, 0deg);
      --_color-1: oklch(from var(--_color) 75% 0 h / 0.8);
      --_color-2: oklch(from var(--_color) 75% 0.2 h / 0.3);
      border: 2px solid white;
      border: 5px solid oklch(from var(--_color) 30% .2 h / 1);
      border-radius: 50%;
      overflow: hidden;
      background: linear-gradient(var(--_gradient-angle), var(--_color-1) 0%, var(--_color-1) 40%, var(--_color-2) 50%);
      background-color: white;
      background-position: 0;
      background-size: 200% 200%;
      animation: rotate-gradient 120s linear infinite;
   }

   img {
      height: 100%;
      mix-blend-mode: multiply;
      filter: drop-shadow(0 0 8px rgba(0,0,0,1)) grayscale(0.9);
   }
</style>
