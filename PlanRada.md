# Plan rada

## Front

- Profil osobe (**Ema**)
- Stranica za dodavanje ispovesti  -> NA home page + dugme koje vodi na nju

- Feed sa ispovestima/objavama (**Matija**)
  - Izbor topica na vrhu glavne stranice (kao YT)
  - Like, judge i comment opcije za post
  - //
  - Sortiranje po broju like-ova [AKO OSTANE VREME]
  - Sortiranje po datumu [AKO OSTANE VREME]

- Feed sa konkretnom objavom (**Djordje**)
  - Komentari [Objavljivanje Edit Delete]
  - Upvote, Downvote za komentare
  - Objavljivanje Edit Delete za objavu
  - Upvote, Downvote za objavu
  
- Mogucnost pokretanja privatnog chat-a sa osobom koja je postavila objavu (nekad...)
  - Chat baziran na pub-sub modelu
  - Obavestenja za novi chat
 

## Back

- ```next:post:id``` - globalni id za ispovest
- ```next:chat:id``` - globalni id za chat
- ```next:person:id``` - globalni id za person
- ```categories:all``` - lista ID-jeva svih kategorija
- ```category:[ID_KATEGORIJE]:posts``` - lista ID-jeva objava u kategoriji
- ```category:[ID_KATEGORIJE]:name``` - naziv kategorije
- ```post:[ID_OBJAVE]:post``` - objekat te objave na osnovu ID-ja
- ```post:[ID_OBJAVE]:comments``` - lista ID-jeva komentara neke objave
- ```post:[ID_OBJAVE]:upvotes``` - set ID-jeva osoba koje su upvoteovale
- ```post:[ID_OBJAVE]:downvotes``` - set ID-jeva osoba koje su downvoteovale
- ```comment:[ID_KOMENTARA]:comment``` - komentar (objekat)
- ```comment:[ID_KOMENTARA]:upvotes``` - set ID-jeva osoba koje su upvoteovale
- ```comment:[ID_KOMENTARA]:downvotes``` - set ID-jeva osoba koje su downvoteovale
- ```person:[ID_OSOBE]:username``` - username osobe
- ```person:[ID_OSOBE]:posts``` - lista ID-jeva objava te osobe
- ```chat``` - kanal za chatovanje, tu se stavljaju objekti tipa Chat
- u konstruktoru proveriti da li globalni idjevi postoje, ako ne - napraviti ih

### Entiteti

- Objava (string text, datetime time, string author_id, int upvotes, int downvotes)
- Osoba
- Kategorija
- Chat (senderID, recipientID, text, time)
- Komentar (string text, int upvotes, int downvotes,string author_id,datetime time)
