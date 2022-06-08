function main(args) {
    const numOne = args.numOne
    const numTwo =  args.numTwo

    const debugData = `The endpoint takes two args when hit with POST you used method: ${args.__ow_method}. The data provided was numOne: ${numOne} and numTwo: ${numTwo}`

    const result = (Number.isInteger(numOne) && Number.isInteger(numTwo)) ? numOne + numTwo : -1
    return { "body": { result, args, debugData } }
  }
  
  exports.main = main;