# React Moment 3 - Flow
Applikationen är en bloggplattform för kortare meddelanden. 

* Det går att gå in på specifika inlägg 
* Läsa alla inlägg från en specifik användare 
* Det går även att ladda upp samt redigera sina egna inlägg på skyddad route
* Adminkonton kan ändra(med admin signatur) samt ta bort allas inlägg på skyddad route
* Det går att registrera nya konton. 

Besök webbplatsen [Flow](https://flow-blog.netlify.app/).

## Uppgift
Uppgiften gick ut på att skapa en react applikation programmerad i TypeScript.

**Krav:**
* Publik del med översikt av innehåll, tex de senaste inläggen/produkterna utskrivna
* Dynamiska routes för enskilda items
* Inloggningssystem med JWT-tokens
* Skyddad administrativ del för innehållshantering (hantera inlägg/produkter)
* Navigationsmeny som uppdateras efter inloggningsstatus (det ska framgå om användaren är inloggad eller inte).
* React Router för routingstruktur med navigering i gränsnittet.
* JWT-autentisering med tokenhantering, antingen lagrat i localStorage eller som HTTP-cookie.
* TypeScript med väldefinierade interface/types
* Responsiv design för olika skärmstorlekar
* Felhantering och tydliga felmeddelanden vid formulärhantering och API-anrop

## Lösning
Webbplatsen uppfyller alla kraven och använder många komponenter och sidkomponenter. 

* BlogContext används för Api-anrop och därifrån läses blogdata in.
* AuthContext används för användar authentisering med api-anrop
* blog.types.ts och auth.types.ts används för interface
* Protected routes används för att skydda routes
* BlogAdminProp.tsx samt BlogArticleProp.tsx används för styling och struktur av inlägg (Child)
* Routing.tsx används för att specifiera webbplatsens routes samt tilldela Context.

Applikationen kopplas till en Nest.js backend och MySQL-databas genom api anrop med FetchAPI.

## Testa
För att testa eller bygga vidare på projektet behöver repot klonas och kommandot ` npm install ` ska köras i terminalen.
För att testköra ` npm run dev `
För att publicera ` npm run build `

**Markus Vickman**
**MAVI2302**
