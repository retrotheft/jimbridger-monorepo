<script lang="ts">
   let {
      fineSize = 3,
      fineRadius = 0.5,
      fineFill = "#FFFFFF06",
      coarseSize = 6,
      coarseRadius = 1,
      coarseFill = "#FFFFFF09",
      children,
   } = $props();

   function createPngDataUri(size: number, radius: number, fillHex: string): string {
      const r = parseInt(fillHex.slice(1, 3), 16);
      const g = parseInt(fillHex.slice(3, 5), 16);
      const b = parseInt(fillHex.slice(5, 7), 16);
      const a = fillHex.length > 7 ? parseInt(fillHex.slice(7, 9), 16) : 255;

      const center = size / 2;
      const raw = new Uint8Array(size * (1 + size * 4));
      let offset = 0;

      for (let y = 0; y < size; y++) {
         raw[offset++] = 0; // filter byte
         for (let x = 0; x < size; x++) {
            const dx = (x + 0.5) - center;
            const dy = (y + 0.5) - center;
            const inside = dx * dx + dy * dy <= radius * radius;
            raw[offset++] = inside ? r : 0;
            raw[offset++] = inside ? g : 0;
            raw[offset++] = inside ? b : 0;
            raw[offset++] = inside ? a : 0;
         }
      }

      // Minimal DEFLATE: single uncompressed block
      const deflateLen = raw.length;
      const deflate = new Uint8Array(deflateLen + 11);
      // zlib header
      deflate[0] = 0x78;
      deflate[1] = 0x01;
      // BFINAL=1, BTYPE=00 (no compression)
      deflate[2] = 0x01;
      deflate[3] = deflateLen & 0xff;
      deflate[4] = (deflateLen >> 8) & 0xff;
      deflate[5] = ~deflateLen & 0xff;
      deflate[6] = (~deflateLen >> 8) & 0xff;
      deflate.set(raw, 7);
      // Adler-32
      let s1 = 1, s2 = 0;
      for (let i = 0; i < raw.length; i++) {
         s1 = (s1 + raw[i]) % 65521;
         s2 = (s2 + s1) % 65521;
      }
      const adler = (s2 << 16) | s1;
      const adlerOffset = 7 + deflateLen;
      deflate[adlerOffset] = (adler >> 24) & 0xff;
      deflate[adlerOffset + 1] = (adler >> 16) & 0xff;
      deflate[adlerOffset + 2] = (adler >> 8) & 0xff;
      deflate[adlerOffset + 3] = adler & 0xff;

      // CRC32
      const crcTable = new Uint32Array(256);
      for (let n = 0; n < 256; n++) {
         let c = n;
         for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
         crcTable[n] = c;
      }
      function crc32(data: Uint8Array): number {
         let crc = 0xffffffff;
         for (let i = 0; i < data.length; i++) crc = crcTable[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
         return (crc ^ 0xffffffff) >>> 0;
      }

      function u32be(v: number): Uint8Array {
         return new Uint8Array([(v >> 24) & 0xff, (v >> 16) & 0xff, (v >> 8) & 0xff, v & 0xff]);
      }

      function chunk(type: string, data: Uint8Array): Uint8Array {
         const t = new TextEncoder().encode(type);
         const combined = new Uint8Array(t.length + data.length);
         combined.set(t);
         combined.set(data, t.length);
         const len = u32be(data.length);
         const crc = u32be(crc32(combined));
         const out = new Uint8Array(4 + combined.length + 4);
         out.set(len);
         out.set(combined, 4);
         out.set(crc, 4 + combined.length);
         return out;
      }

      const sig = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
      const ihdrData = new Uint8Array(13);
      const ihdrView = new DataView(ihdrData.buffer);
      ihdrView.setUint32(0, size);
      ihdrView.setUint32(4, size);
      ihdrData[8] = 8;  // bit depth
      ihdrData[9] = 6;  // RGBA
      ihdrData[10] = 0; // compression
      ihdrData[11] = 0; // filter
      ihdrData[12] = 0; // interlace

      const ihdr = chunk("IHDR", ihdrData);
      const idat = chunk("IDAT", deflate.subarray(0, adlerOffset + 4));
      const iend = chunk("IEND", new Uint8Array(0));

      const png = new Uint8Array(sig.length + ihdr.length + idat.length + iend.length);
      let p = 0;
      png.set(sig, p); p += sig.length;
      png.set(ihdr, p); p += ihdr.length;
      png.set(idat, p); p += idat.length;
      png.set(iend, p);

      let binary = '';
      for (let i = 0; i < png.length; i++) binary += String.fromCharCode(png[i]);
      return `data:image/png;base64,${btoa(binary)}`;
   }

   let finePng = $derived(createPngDataUri(fineSize, fineRadius, fineFill));
   let coarsePng = $derived(createPngDataUri(coarseSize, coarseRadius, coarseFill));
</script>

<div
   class="dotfield"
   style:--fine-png="url('{finePng}')"
   style:--fine-size="{fineSize}px"
   style:--coarse-png="url('{coarsePng}')"
   style:--coarse-size="{coarseSize}px"
>
   {@render children?.()}
</div>

<style>
   .dotfield {
      --_bg-color: var(--bg-color, rgba(0,0,0,0.2));
      background:
         var(--fine-png) repeat,
         var(--coarse-png) repeat;
      background-size:
         var(--fine-size) var(--fine-size),
         var(--coarse-size) var(--coarse-size);
      background-color: var(--_bg-color);
      min-height: 100%;
   }
</style>
