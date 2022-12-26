# Plan rada

## Front

- Live feed sa ispovestima/objavama
  - Izbor topica na vrhu glavne stranice (kao YT)
  - Like, judge i comment opcije za post
  - Sortiranje po broju like-ova
  - Sortiranje po datumu
- Mogucnost pokretanja privatnog chat-a sa osobom koja je postavila objavu
  - Chat baziran na pub-sub modelu
  - Obavestenja za novi chat
- Stranica za dodavanje ispovesti

## Back

- ```next:post:id``` - globalni id za ispovest
- ```next:chat:id``` - globalni id za chat
- ```next:person:id``` - globalni id za person
- ```categories:all``` - lista ID-jeva svih kategorija
- ```category:[ID_KATEGORIJE]:posts``` - lista ID-jeva objava u kategoriji
- ```category:[ID_KATEGORIJE]:name``` - naziv kategorije
- ```post:[ID_OBJAVE]:post``` - objekat te objave na osnovu ID-ja
- ```post:[ID_OBJAVE]:comments``` - lista ID-jeva komentara neke objave
- ```post:[ID_OBJAVE]:upvotes``` - lista ID-jeva osoba koje su upvoteovale
- ```post:[ID_OBJAVE]:downvotes``` - llista ID-jeva osoba koje su downvoteovale
- ```comment:[ID_KOMENTARA]:comment``` - komentar (objekat)
- ```comment:[ID_KOMENTARA]:upvotes``` - lista ID-jeva osoba koje su upvoteovale
- ```comment:[ID_KOMENTARA]:downvotes``` - lista ID-jeva osoba koje su downvoteovale
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
