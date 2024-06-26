# jklsummerstart.com sivut

Sivut käyttävät nuxt content modulia, joka mahdollistaa sivujen sisällön kirjoittamisen markdownilla. Sivut ovat staattisia ja ne hostataan cloudflare pages:issa. Muutokset julkaistaan automaattisesti jokaisen main branchiin tulleen commitin jälkeen.

[Content documentation](https://content.nuxt.com/) ohjeet content moduliin.

## Sivujen muokkaaminen

muokkaa `content` kansiosta löytyviä markdown tiedostoja. Sivut päivittyvät automaattisesti kun muutokset on tehty ja pushattu githubiin.

Jos epäselvää, kysy Jukalta apua.

## Muokkas selaimessa

- Tee github tunnus
- Tee uusi pull request stackblitzin kautta: [new pull request](https://pr.new/xvaara/jklsummerstart.com)
- Muokkaa sivuja ja tallenna muutokset
- Tee pull request

## Lokaali muokkaaminen

- Tee github tunnus
- Asenna git
- Asenna node.js
- Kloonaa tämä repository
- Asenna riippuvuudet
- Käynnistä kehitysserveri
- Tee muutoksia ja puske ne githubiin

## Kloonaa tämä repository

```bash
git clone git@github.com:xvaara/jklsummerstart.com.git
```

Asenna riippuvuudet:

```bash
# asenna pnpm
npm install -g pnpm

# pnpm
pnpm install
```

## Kehitys Server

Käynnistä kehityspalvelin osoitteessa http://localhost:3000

```bash
pnpm dev
```
