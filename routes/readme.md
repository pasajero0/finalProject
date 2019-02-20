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
                "price": 345,
                "salePrice": 345,
                "size": "md",
                "color": "blue",
                "gender": "man",
                "category": "dress",
                "name": "Ad excepteur nulla occaecat in nostrud aute officia est et est sit exercitation in.",
                "description": "Sunt est labore sit cupidatat laborum adipisicing eiusmod. Dolore mollit est duis ipsum sint dolor fugiat est dolor occaecat magna reprehenderit qui. Quis pariatur consequat Lorem enim reprehenderit non.\n\nCillum tempor dolore velit consectetur est cupidatat dolore. Aliqua elit dolore qui irure reprehenderit do et sint ex sunt. Eu incididunt ad duis id laborum. Anim anim tempor velit et do veniam reprehenderit aliqua velit labore nostrud ad est ullamco.",
                "isBrandNew": false,
                "isPopular": true,
                "isAvailable": false,
                "isOnSale": false,
                "rate": 5,
                "picture": "http://placehold.it/32x32",
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

