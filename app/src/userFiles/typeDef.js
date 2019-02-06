const { gql } = require("apollo-server");

const typeDef = gql`
  
  type File {
    id: Int
    name: String
    mime: String
    blob: String
  }

  input FileInput {
    name: String
    mime: String
    blob: String
  }

  input DeleteFileInput {
    id: Int!
  }

  type userFiles {
    success: Boolean
    info: String
    files: [File]
  }

  type UploadFileResponse{
    success: Boolean
    info: String
  }

  type DeleteFileResponse{
    success: Boolean
    info: String
  }

  extend type Query{
    user_files: userFiles @auth
  }

  extend type Mutation{
    upload_file(file: FileInput): UploadFileResponse @auth,
    delete_file(file: DeleteFileInput): DeleteFileResponse @auth,
  }
`;


module.exports.typeDef = typeDef;