# Dating Web Service
> Running on Heroku (https://datingwebservice.herokuapp.com)<br>
> API used by Date App


<h2>API routes:</h2>
 
POST: your_host/usuario<br>
Body: {"nome": name, "email": email, "senha": password, "genero": gender, "generoPreferencia": preferedGender}<br><br>

POST: your_host/usuario/login -> return an Access Token and a Refresh Token<br>
Body: {"email": email, "senha": password} <br><br>

POST: your_host/usuario/logout<br>
Header: Authorization: Bearer your_accessToken<br>
Body: {"refreshToken": your_refresh_token}<br><br>

POST: your_host/usuario/atualiza_token -> return a new Access Token and a new Refresh Token<br>
Body: {"refreshToken": your_refresh_token}<br><br>

GET: your_host/perguntas/:id -> return a question<br>
Header: Authorization: Bearer your_accessToken<br><br>

POST: your_host/resposta<br>
Header: Authorization: Bearer your_accessToken<br>
Body: {"resposta": your_answer, "perguntaId": questionId, "usuarioId": userId}<br><br>
