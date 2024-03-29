# Anonymer ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
Anonymer is student project done for Advanced Databases subject at Faculty of Electronic Engineering, University of Niš.

## ✨ Contributors (Student, ID)

* Emilija Ćojbašić, 18026
* Matija Špeletić, 18043
* Đorđe Antić, 17544

<a href="https://github.com/djoleant/InternClix/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=djoleant/InternClix" />
</a>

## 📦 Stack
* Redis
* Asp.net WebApi
* React (JS)

## 🚀 Quickstart

```bash
> # Clone repository
> git clone https://github.com/djoleant/Anonymer.git
> cd Anonymer

> # Server start
> cd Anonymer/Anonymer
> dotnet watch run

> # Client start
> cd ../../AnonymerApp
> npm install
> npm start

> # Start redis in docker
> docker run --name redis-6opZ -p 49153:6379 -d redis
```

## 🔙🔚 Backend

### Struktura

| Kljuc  |Vrednost   |
|---|---|
| ```next:post:id```  |  globalni id za ispovest |
| ```next:category:id```  | globalni id za kategoriju  |
| ```next:person:id```  |  globalni id za person |
|```categories:all```|set ID-jeva svih kategorija|
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
