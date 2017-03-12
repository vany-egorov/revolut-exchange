const UNKNOWN = 0
const DEV = 1
const TEST = 2
const DEMO = 3
const PROD = 4


function parse(v) {
  v = String(v)
  v = v.toLowerCase()
  v = v.replace(/_/g, "-")

  switch (v) {
  case "1":
  case "d":
  case "dev":
  case "development":
    return DEV

  case "2":
  case "t":
  case "tst":
  case "test":
    return TEST

  case "3":
  case "demo":
    return DEMO

  case "p":
  case "prod":
  case "production":
    return PROD
  }

  return UNKNOWN
}

function toString(v) {
  switch (v) {
  case DEV:
    return "dev / development"
  case TEST:
    return "test"
  case DEMO:
    return "demo"
  case PROD:
    return "prod / production"
  }

  return "unknown"
}

function isUnknown(v) { return v == UNKNOWN }
function isDev(v) { return v == DEV }
function isTest(v) { return v == TEST }
function isDemo(v) { return v == DEMO }
function isProd(v) { return v == PROD }

module.exports = {
  UNKNOWN: UNKNOWN,
  DEV: DEV,
  TEST: TEST,
  DEMO: DEMO,
  PROD: PROD,

  parse: parse,
  toString: toString,

  isUnknown: isUnknown,
  isDev: isDev,
  isTest: isTest,
  isDemo: isDemo,
  isProd: isProd,
}
