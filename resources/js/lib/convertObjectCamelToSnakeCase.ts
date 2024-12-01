const changeCamelToSnakeCase = (key: string): string => {
  return key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

type ObjectType = {
  [key: string]: any
}
const convertObjectCamelToSnakeCase = (obj: any): any => {
  const newObj: ObjectType = {}
  for (const [key, value] of Object.entries(obj)) {
    const isFile = value instanceof (File || Blob)
    const isObject = typeof value === 'object' && value

    if (Array.isArray(value)) {
      newObj[changeCamelToSnakeCase(key)] = value.map((v) =>
        typeof v === 'object' ? convertObjectCamelToSnakeCase(v) : v,
      )
    } else if (isObject && !isFile) {
      newObj[changeCamelToSnakeCase(key)] = convertObjectCamelToSnakeCase(value)
    } else {
      newObj[changeCamelToSnakeCase(key)] = value
    }
  }
  return newObj
}

export default convertObjectCamelToSnakeCase
