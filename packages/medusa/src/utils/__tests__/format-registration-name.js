import path from "path"
import {
  formatRegistrationName,
  formatRegistrationNameWithoutNamespace,
} from "../format-registration-name"

describe("formatRegistrationName", () => {
  const tests = [
    [["ninja-test-dir", "dist", "services", "my-test.js"], "myTestService"],
    [["ninja-test-dir", "dist", "services", "my.js"], "myService"],
    [["services", "my-quite-long-file.js"], "myQuiteLongFileService"],
    [
      ["/", "Users", "seb", "com.ninja.js", "services", "dot.js"],
      "dotService",
    ],
    [
      ["/", "Users", "seb.rin", "com.ninja.js", "services", "dot.js"],
      "dotService",
    ],
    [
      ["/", "Users", "seb.rin", "com.ninja.js", "repositories", "dot.js"],
      "dotRepository",
    ],
    [
      ["/", "Users", "seb.rin", "com.ninja.js", "models", "dot.js"],
      "dotModel",
    ],
    [["C:", "server", "services", "dot.js"], "dotService"],
  ]

  test.each(
    tests.map(([pathParts, expected]) => [path.join(...pathParts), expected])
  )("Service %s -> %s", (fn, expected) => {
    const res = formatRegistrationName(fn)
    expect(res).toEqual(expected)
  })
})

describe("formatRegistrationNameWithoutNamespace", () => {
  const tests = [
    [["ninja-test-dir", "dist", "services", "my-test.js"], "myTest"],
    [["ninja-test-dir", "dist", "services", "my.js"], "my"],
    [["services", "my-quite-long-file.js"], "myQuiteLongFile"],
    [["/", "Users", "seb", "com.ninja.js", "services", "dot.js"], "dot"],
    [["/", "Users", "seb.rin", "com.ninja.js", "services", "dot.js"], "dot"],
    [
      ["/", "Users", "seb.rin", "com.ninja.js", "repositories", "dot.js"],
      "dot",
    ],
    [["/", "Users", "seb.rin", "com.ninja.js", "models", "dot.js"], "dot"],
    [["C:", "server", "services", "dot.js"], "dot"],
  ]

  test.each(
    tests.map(([pathParts, expected]) => [path.join(...pathParts), expected])
  )("Service %s -> %s", (fn, expected) => {
    const res = formatRegistrationNameWithoutNamespace(fn)
    expect(res).toEqual(expected)
  })
})
