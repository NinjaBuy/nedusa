const path = require(`path`)
const glob = require(`glob`)
const fs = require(`fs`)

const pkgs = glob.sync(`./packages/*`).map((p) => p.replace(/^\./, `<rootDir>`))

const reNinja = /ninja$/
const ninjaDir = pkgs.find((p) => reNinja.exec(p))
const ninjaBuildDirs = [`dist`].map((dir) => path.join(ninjaDir, dir))
const builtTestsDirs = pkgs
  .filter((p) => fs.existsSync(path.join(p, `src`)))
  .map((p) => path.join(p, `__tests__`))
const distDirs = pkgs.map((p) => path.join(p, `dist`))
const ignoreDirs = [].concat(
  ninjaBuildDirs,
  builtTestsDirs,
  distDirs,
  "<rootDir>/packages/ninja-react/*"
)

const coverageDirs = pkgs.map((p) => path.join(p, `src/**/*.js`))
const useCoverage = !!process.env.GENERATE_JEST_REPORT
const projects = pkgs.map((pkg) => pkg.concat("/jest.config.js"))

module.exports = {
  notify: true,
  verbose: true,
  roots: ["<rootDir>"],
  projects: ["<rootDir>/packages/*/jest.config.js"],
  modulePathIgnorePatterns: ignoreDirs,
  coveragePathIgnorePatterns: ignoreDirs,
  testPathIgnorePatterns: [
    `<rootDir>/examples/`,
    `<rootDir>/dist/`,
    `<rootDir>/node_modules/`,
    `__tests__/fixtures`,
  ],
  //moduleNameMapper: {
  //  "^highlight.js$": `<rootDir>/node_modules/highlight.js/lib/index.js`,
  //},
  //snapshotSerializers: [`jest-serializer-path`],
  collectCoverageFrom: coverageDirs,
  //reporters: process.env.CI
  //  ? [[`jest-silent-reporter`, { useDots: true }]].concat(
  //      useCoverage ? `jest-junit` : []
  //    )
  //  : [`default`].concat(useCoverage ? `jest-junit` : []),
  // setupFiles: [`<rootDir>/.jestSetup.js`],
}
