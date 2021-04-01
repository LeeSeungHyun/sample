module.exports = function myBabelplugin() {
  return {
    visitor: {
      VariableDeclaration(path) {
        console.log("VariableDeclaration() kind:", path.node.kind) // const

        // const => bar 변환
        if (path.node.kind === "const") {
          path.node.kind = "var"
        }
      },
    },
  }
}