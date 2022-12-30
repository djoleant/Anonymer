# Anonymer

Anonymer is student project done for Advanced Databases subject at Faculty of Electronic Engineering, University of Niš.

## Backend

### Struktura

| Kljuc  |Vrednost   |
|---|---|
| ```next:post:id```  |  globalni id za ispovest |
| ```next:category:id```  | globalni id za kategoriju  |
| ```next:person:id```  |  globalni id za person |
|```categories:all```|lista ID-jeva svih kategorija|
|```category:[ID_KATEGORIJE]:posts```|lista ID-jeva objava u kategoriji|
|```category:[ID_KATEGORIJE]:postssorted```|sortirani skup ID-jeva objava u kategoriji|
|```category:[ID_KATEGORIJE]:name```|naziv kategorije|
|```post:[ID_OBJAVE]:post```|objekat te objave na osnovu ID-ja|
|```post:[ID_OBJAVE]:comments```|lista ID-jeva komentara neke objave|
|```post:[ID_OBJAVE]:upvotes```|set ID-jeva osoba koje su upvoteovale|
|```post:[ID_OBJAVE]:downvotes```|set ID-jeva osoba koje su downvoteovale|
|```comment:[ID_KOMENTARA]:comment```|komentar (objekat)|
|```comment:[ID_KOMENTARA]:upvotes```|set ID-jeva osoba koje su upvoteovale|
|```comment:[ID_KOMENTARA]:downvotes```|set ID-jeva osoba koje su downvoteovale|
|```person:[ID_OSOBE]:username```|username osobe|
|```person:[ID_OSOBE]:posts```|lista ID-jeva objava te osobe|

### Entiteti

- ```Post``` (string text, datetime time, string author_id, int upvotes, int downvotes, string categoryID)
- ```Person``` (string ID, string username)
- ```Category```
- ```Comment``` (string text, int upvotes, int downvotes,string author_id,datetime time)
