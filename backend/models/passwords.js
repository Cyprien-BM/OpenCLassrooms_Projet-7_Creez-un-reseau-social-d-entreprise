const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
  .is().min(8)                                    
  .is().max(64)
  .has().uppercase()                             
  .has().lowercase()                              
  .has().digits(2)                                
  .has(/[\\ !"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]/g)
  .not(/<script>|<script\/>|SELECT|FROM|UPDATE|DELETE|SHOW|CREATE|ALTER|INSERT|DROP/gi);

module.exports = passwordSchema;