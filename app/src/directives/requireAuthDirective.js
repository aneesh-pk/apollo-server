const { SchemaDirectiveVisitor, AuthenticationError } = require("apollo-server");
const jwt = require('jsonwebtoken');
const fs = require('fs');

class AuthDirective extends SchemaDirectiveVisitor {

  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { role } = this.args;
    field.resolve = async function (...args) {
      const [, , ctx] = args;
      if (ctx.token && ctx.token.length > 0) {
        try{
          var user = jwt.verify(ctx.token, fs.readFileSync('private.key'));
          ctx.user = user;
          const result = await resolve.apply(this, args);
          return result;
        }catch(err){
          throw new AuthenticationError(
            "You must be signed in to view this resource."
          );
        }
      }else {
        throw new AuthenticationError(
          "You must be signed in to view this resource."
        );
      }
    };
  }
}

module.exports.AuthDirective = AuthDirective;