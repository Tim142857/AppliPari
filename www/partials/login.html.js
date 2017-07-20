views['login.html.js'] = `    
    <h1>Connexion</h1>
    <form id="formLogin">
        <div class="form-group">
            <label for="inputUsername">Username</label>
            <input type="text" class="form-control" name="username" id="inputUsername" placeholder="Username...">
        </div>
        <div class="form-group">
            <label for="inputPassword">Password</label>
            <input type="password" class="form-control" name="password" id="inputPassword" placeholder="Password...">
        </div>
        <button type="submit" class="btn btn-default">Se connecter</button>
    </form>
    <button type="button" class="btn btn-default" onclick="genereView('register.html.js')">
        S'inscrire
    </button>
    <button type="button" class="btn btn-default" onclick="genereView('recoverPassword.html.js')">
        Mot de passe oublié
    </button>
    `;