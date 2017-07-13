views['register.html.js'] = `
<div class="row">
<div class="col-xs-12">
<h2>Inscription</h2>
<form id="formRegister">
<div class="form-group">
    <label for="inputPseudo">Pseudo</label>
    <input type="text" class="form-control" name="username" id="inputPseudo">
  </div>
  <div class="form-group">
    <label for="inputEmail">Email</label>
    <input type="email" class="form-control" name="email" id="inputEmail">
  </div>
  <div class="form-group">
    <label for="inputPassword">Password</label>
    <input type="password" class="form-control" name="password" id="inputPassword">
  </div>
  <div class="form-group">
    <label for="inputConfirmPassword">Confirm Password</label>
    <input type="password" class="form-control" name="confirmPassword" id="inputConfirmPassword">
  </div>
  <button type="submit" class="btn btn-default">S'inscrire</button>
</form>
<div>
</div>
`;
