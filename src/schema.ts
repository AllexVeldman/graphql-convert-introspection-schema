import {IntrospectionQuery, buildClientSchema, printSchema} from 'graphql'

import {readFile, writeFile} from 'fs/promises'

/*
 * Convert a JSON introspection schema to a graphql schema
 *
 * :param schema: path to the JSON schema file
 */
export async function parseSchema(schema: string): Promise<string> {
  const data = await readFile(schema, {encoding: 'utf-8'})
  const obj = JSON.parse(data)
  const clientSchema = buildClientSchema(obj.data as IntrospectionQuery)
  const graphqlSchema = printSchema(clientSchema)
  return graphqlSchema
}

export async function convertSchema(
  schema: string,
  output_path: string
): Promise<string> {
  const data = await parseSchema(schema)
  await writeFile(output_path, data)
  return output_path
}
