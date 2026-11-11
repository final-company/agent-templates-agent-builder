# Final Agent Builder template

A public source template for Final's bootstrapping agent. Given the person's context, Agent Builder reuses an existing agent, forks and customizes a suitable foundation, or authors new agent behavior from scratch on minimal scaffolding. It also configures, repairs, and updates agents, preserves downstream customizations when merging upstream changes, and reports the source commit, checks, and publication result.

Built with the `@finalai/agents` TypeScript SDK. The package layout follows [Final Home](https://github.com/final-company/agent-templates-home).

## Getting started

Requires Node.js 26.10 or newer and pnpm 12.14.0. From the repository root:

```sh
pnpm install
pnpm run format:check
pnpm run typecheck
pnpm run print
```

`pnpm run print` loads `src/agent.ts` and writes the agent's document as JSON. It makes no network calls and needs no API key. Nothing is compiled or built: the document is the agent.

## What the agent requires

The agent states what it needs; whoever starts it provides the implementations.

| Requirement | Meaning |
| --- | --- |
| Harness | Any harness that allows `auto` permissions. It recommends the Final harness with `deepseek-v4.1-flash-1017` at high reasoning, but the caller chooses. |
| Compute | `files` with write access and `shell`, on one machine, for checking out, editing, and validating agent source. |
| `final` integration | Final's tools for the project: agents, chats, Tasks, and publishing. It loads the tool guide, agent discovery, chat-change tools, `get_task` for reading a Task the builder is assigned, `read_original_message` for retrieving referenced messages by their exact chat and message IDs, and `publish_agent`. Other permitted tools remain discoverable through tool search. Broad conversation listing, reading, and posting, separate agent sessions, and creating, updating, delegating, or withdrawing Tasks are denied. |

No repository or deployment is hard-coded: the builder resolves the requested target through Final and checks out its source on the machine it is given. Repository access uses the acting person's existing permissions. Installing this public template grants no access to another person's repositories and contains no credentials.

## How it builds and publishes agents

The builder writes each agent as one explicit module that exports a `defineAgent` value: instructions, skills, tools, hooks, and requirements are listed in the module rather than found by directory layout. Requirements name the harness permission ceiling, the compute capabilities the model drives, and integration slots; they never name a machine, server, credential, or model binding. Custom tools are serverless tools: self-contained functions that run on Final's runtime with no imports.

Before committing, the builder runs `pnpm exec final-agents print <module>` to check that the agent loads and produces a valid document. Pushing saves source and never publishes. When the person asks to publish, the builder prints the document from the pushed commit and publishes it with the `publish_agent` tool, then verifies that the agent points at the returned document hash. Git access cannot publish, and a publication failure is reported explicitly while the prepared source work is kept.

Agent selection is an implementation decision: existing agents can take the task without a selection approval. When the builder judges that a new agent is needed, it requests one concrete build approval covering repository creation, customization, validation, publication, and use for the task. Retries reuse that authorization and operation. Listing a template in the catalog and changing Home remain separate decisions. This repository supplies the template source; it does not register a catalog listing or change anyone's Home.

## Customizing the agent

The agent source lives in `src/`:

| File | Purpose |
| --- | --- |
| [`src/agent.ts`](src/agent.ts) | Agent identity, requirements, and tool restrictions. |
| [`src/instructions.md`](src/instructions.md) | Agent selection, authoring, forks, validation, publication, and handoff behavior. |

After making changes, run `pnpm run typecheck` and `pnpm run print`. Use `pnpm run format` to format the source or `pnpm run format:check` to check formatting. Commit the root lockfile when changing dependencies. Do not commit credentials or local environment files.

## Reviewing an installation

A printed document validates the source. Before relying on an installed builder, verify these behaviors:

- A new session has shell and file tools on the machine provided for it.
- A minimal scaffold template and the combined preparation, initialization, and completion operations are available.
- Work that an existing agent can cover proceeds without an agent-selection or build approval. Agent Builder answers straightforward agent-configuration questions directly and leaves underlying task work to the chosen agent.
- A new agent is proposed when the builder judges it necessary or the person explicitly requests one; one concrete build approval covers creation through publication and use. Decline creates nothing.
- Agents it writes are one explicit module with serverless tools, and `final-agents print` succeeds on them.
- Template and variant builds initialize the source transfer, customize and validate, then publish the final customized commit without an intermediate foundation publication or a second confirmation.
- A push alone publishes nothing; a requested publication goes through `publish_agent` and the agent then points at the returned hash.
- A request to prepare a change for review produces a concrete diff and check results before any push or publication.
- An upstream sync preserves downstream commits and customizations, uses a normal push, and reports both source and resulting commit SHAs.
- Missing repository or publication access produces a specific blocker; a successful Git operation is never reported as a successful publication.

## License

Licensed under the [Apache License, Version 2.0](LICENSE).

Copyright 2026 Final, Inc. See [NOTICE](NOTICE). Configuration and attribution conventions are adapted from the Apache-2.0-licensed [Final Home template](https://github.com/final-company/agent-templates-home).
