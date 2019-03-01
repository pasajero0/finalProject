##Рабочие маршруты

###POST /customers

проверяет входные данные и добавляет пользователя в случае успеха

_ожидает:_ 
```javascript
{ 
  password,
  email
}
```
_отдает:_

в случае неверной структуры входных данных (отсутствия password или/и customer):

**200** ответ

```javascript
{
    "data": {},
    "message": "Invalid incoming data",
    "success": false
}
```

в случае невернных данных 

**200** ответ


```javascript
{
 "data": {
        "email": "E-mail is required",
        "last_name": "Last name is required",
        "login": "This login already taken"
    },
    "message": "Customer validation failed: email: E-mail is required, last_name: Last name is required, login: This login already taken",
    "success": false
}
```

в случае успешной проверки

**200** ответ


```javascript
{
    "data": {
        "email": "johnsmith35@gmail.com",
        "first_name": "john",
        "last_name": "smith",
        "creation_date": "Mon, 04 Feb 2019 21:07:35 GMT",
        "id": "5c58a9979a959b5f2c2fac56",
        "number": "00000003"
    },
    "message": "",
    "success": true
}
```
---

###POST /customers/auth

аутентификация зарегистрированного пользователя

_ожидает:_ 
```javascript
{ 
  password, login
}
```

_отдает:_

в случае невернных данных 

**200** ответ

```javascript
{
    "data": {},
    "message": "Missing credentials",
    "success": false
}
```

или

```javascript
{
    "data": {},
    "message": "Incorrect username.",
    "success": false
}
```
в случае успешной проверки

**200** ответ

```javascript
{
    "data": {},
    "message": "You have been logged in",
    "success": true
}
```

---

###GET /customers/profile

данные  пользователя

**404** ответ 
для незалогиненного посетителя

**200** ответ
для залогиненного посетителя

```javascript
{
    "data": {
        "email": "johnsmith35@gmail.com",
        "login": "test5",
        "first_name": "john",
        "last_name": "smith",
        "creation_date": "Mon, 04 Feb 2019 21:07:35 GMT",
        "id": "5c58a9979a959b5f2c2fac56",
        "number": "00000003"
    },
    "message": "",
    "success": true
}
   ```

---

###GET /customers/logout

**200** ответ

```javascript
{
    "data": {},
    "message": "You have been logged out",
    "success": true
}
```

---

###POST /password/send-token

проверяет электронный адрес. Если находит высылает писсьмо с ссылкой на изменение пароля

_ожидает:_ 
```javascript
{ 
  email
}
```
_отдает:_

в случае ошибки (не найден пользователь)

**200** ответ

```javascript
{
    "data": {},
    "message": "No valid entry found",
    "success": false
}
```

в случае успеха

**200** ответ


```javascript
{
    "data": {},
    "message": "Reset password link has been sent",
    "success": true
}
```

---

###POST /password/save

проверяет токен, электронный адрес. В случае успеха сохраняет новый праоль

_ожидает:_ 
```javascript
{ 
  email, token, password
}
```
_отдает:_

в случае ошибки (не найден пользователь или неверный токен)

**200** ответ

```javascript
{
    "data": {},
    "message": "Token is invalid or outdated",
    "success": false
}
```

в случае успеха

**200** ответ


```javascript
{
    "data": {},
    "message": "New password has been saved",
    "success": true
}
```

---

###GET /products

получает список продуктов 

_ожидает необязательные параметры в url:_ 
```javascript
{ 
  page, perPage
}
```
_отдает:_

**200** ответ


```javascript
{
    "data": {
        "perPage": 10,
        "page": 1,
        "records": [
            {
                "company": "Geofarm",
                "country": "Ghana",
                "prices":{
                  "retail":890,
                  "sale":890
                },
                "name": "Ad excepteur nulla occaecat in nostrud aute officia est et est sit exercitation in.",
                "description": "Sunt est labore sit cupidatat laborum adipisicing eiusmod. Dolore mollit est duis ipsum sint dolor fugiat est dolor occaecat magna reprehenderit qui. Quis pariatur consequat Lorem enim reprehenderit non.\n\nCillum tempor dolore velit consectetur est cupidatat dolore. Aliqua elit dolore qui irure reprehenderit do et sint ex sunt. Eu incididunt ad duis id laborum. Anim anim tempor velit et do veniam reprehenderit aliqua velit labore nostrud ad est ullamco.",
                "isBrandNew": false,
                "isPopular": true,
                "isAvailable": false,
                "isOnSale": false,
                "rate": 5,
                "pictures": ["http://placehold.it/32x32"],
                "added": "Sun, 23 Sep 2018 08:59:43 GMT",
                "id": "5c6d25767534317e7e3c48fd"
            },
            ...
        ],
        "count": 94,
        "pagesTotal": 10
    },
    "message": "",
    "success": true
}
```
---

###GET /products/:slug

получает конкретный продукт по слагу

_отдает:_

**200** ответ

```javascript
{
    "data": {
        "prices": {
            "retail": 319,
            "sale": 87
        },
        "departmentsIds": [],
        "pictures": [
            "1635021001_2_7_16.jpg",
            "1635021001_2_4_16.jpg",
            "1635021001_2_2_16.jpg",
            "1635021001_2_1_16.jpg"
        ],
        "brand": "ZARA",
        "country": "Italy",
        "name": "White leather trainers with chunky soles",
        "description": "Trainers made of cowhide leather with a nappa leather finish. Featuring different pieces, a leather animal print detail on the heel cap, leather insoles and trims and rubber soles.",
        "slug": "white-leather-trainers-with-chunky-soles-345681",
        "departmentIds": [
            "608",
            "611"
        ],
        "added": "Thu, 28 Feb 2019 16:22:05 GMT",
        "isBrandNew": true,
        "isAvailable": true,
        "isOnSale": false,
        "rate": 2,
        "id": "undefined"
    },
    "message": "",
    "success": true
}
```


---

###GET /departments

получает список отделов 

_отдает:_

**200** ответ


```javascript
{
    "data": {
        "records": [
            {
              "_id":603,
              "name":"dress",
              "slug":"woman-dress",
              "parent":602,
              "position":0,
              "filters":{
                "country":["Slovak Republic"],
                "brand":["Techade"],
                "size":["s","m","l"],
                "color":["yellow","green","blue"]}},
            ...
        ]
    },
    "message": "",
    "success": true
}
```


