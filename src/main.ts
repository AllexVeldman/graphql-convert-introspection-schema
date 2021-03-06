import * as core from '@actions/core'
import {convertSchema} from './schema'

async function run(): Promise<void> {
  try {
    const schema: string = core.getInput('schema')
    const output: string = core.getInput('output')
    const output_path = await convertSchema(schema, output)
    core.setOutput('path', output_path)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
