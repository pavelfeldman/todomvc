---
agent: agent
description: Produce test coverage
---

1. Call #playwright-test-planner subagent with prompt:

<plan>
  <task-text>Create basic test plan with 3 tests for simpler todo operations</task-text>
  <seed-file>tests/seed.spec.ts</seed-file>
  <plan-file>specs/basic-3.plan.md</plan-file>
</plan>

2. For each test case from the test plan file (1.1, 1.2, ...), one after another, not in parallel, call #playwright-test-generator subagent with prompt:

<generate>
  <test-suite><!-- Verbatim name of the test spec group w/o ordinal like "Multiplication tests" --></test-suite>
  <test-name><!-- Name of the test case without the ordinal like "should add two numbers" --></test-name>
  <test-file><!-- Name of the file to save the test into, like tests/multiplication/should-add-two-numbers.spec.ts --></test-file>
  <seed-file><!-- Seed file path from test plan --></seed-file>
  <body><!-- Test case content including steps and expectations --></body>
</generate>

3. Call #playwright-test-healer subagent with prompt:

<heal>Run all tests and fix the failing ones one after another.</heal>
