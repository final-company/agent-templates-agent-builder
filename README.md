# Final Agent Builder template

A public source template for Final's bootstrapping agent. Given the person's context, Agent Builder reuses an existing agent, forks and customizes a suitable foundation, or builds an agent from scratch. It also configures, repairs, and updates agents, preserves downstream customizations when merging upstream changes, and reports the source commit, checks, and publication result.

Built with the `@finalai/agents` TypeScript SDK. The package layout and hosted Final connection follow [Final Home](https://github.com/final-company/agent-templates-home).

## Getting started

Requires Node.js 26.10 or newer and pnpm 12.14.0. From the repository root:

```sh
pnpm install
pnpm run format:check
pnpm run typecheck
pnpm run build
```

The build writes generated files to `src/.final/compile/`, which is excluded from version control. Local compilation does not require an API key. Set `FINAL_API_KEY` to also check compatibility with the installed Final harness; set `FINAL_API_HOST` when targeting a deployment other than the CLI default. Supply credentials through your secure environment, never committed source.

## Runtime

The template declares shell and file tools on a Final computer with `workspace: 'session'`. Hosting resolves the organization's default computer and the `final` connection. A linked Device is not required. No repository or deployment is hard-coded: the builder resolves the requested target through Final and checks out its source in its session workspace.

The Final connection loads the tool guide, agent selection and chat-change tools, and `read_original_message` for retrieving referenced source messages by their exact chat and message IDs. Other permitted tools remain discoverable through the gateway. Broad conversation listing, reading, posting, and separate agent session creation and reading are disabled.

Repository access uses the acting person's existing permissions; Git in the session sandbox is already authenticated by Final for registered repositories, whether connected from GitHub or hosted by Final. Installing this public template grants no access to another person's repositories and contains no credentials. The host must have the Final computer provider and hosted Final connection configured. The sandbox supplies execution; it does not grant repository or publishing permissions.

For an existing Final-hosted agent, pushing its configured default branch schedules automatic publication. The builder verifies the resulting published commit with the session’s `get_agent` tool. Explicit publication requires an authorized agent-management tool or SDK/CLI authentication for the selected deployment. The hosted Final MCP connection does not inject a CLI `FINAL_API_KEY`, and Git access cannot authenticate a publication request. The builder reports missing publication access explicitly and preserves the prepared source work.

Agent selection is an implementation decision: existing assistants can take the task without a selection approval. When the builder judges that a new agent is needed, it requests one concrete build approval covering repository creation, customization, validation, publication, and use for the task. Initialization verifies the source transfer before customization; completion publishes the validated final commit. Retries reuse that authorization and operation. Listing a template in the catalog and changing Home remain separate decisions. This flow requires the platform lifecycle changes in the companion black-pearl PR. This repository supplies the template source; it does not register a catalog listing or change anyone's Home.

## Customizing the agent

The agent source lives in `src/`:

| File | Purpose |
| --- | --- |
| [`src/agent.ts`](src/agent.ts) | Agent identity, model, credentials, runtime settings, and shell/file capabilities. |
| [`src/instructions.md`](src/instructions.md) | Agent selection, authoring, forks, validation, publication, and handoff behavior. |
| [`src/sandbox.ts`](src/sandbox.ts) | Final computer with a workspace scoped to the session. |
| [`src/connections/final.ts`](src/connections/final.ts) | Hosted Final connection and conversation access restrictions. |

The default harness uses the same organization-paid platform credential chain, model, reasoning, and permission mode as the Home template. Runtime permissions still apply to each operation. Repository access and publication authentication are separate from model billing.

After making changes, run `pnpm run typecheck` and `pnpm run build`. Use `pnpm run format` to format the source or `pnpm run format:check` to check formatting. Commit the root lockfile when changing dependencies. Do not commit generated build output, credentials, or local environment files.

## Reviewing a hosted installation

Compilation validates source configuration. Before relying on an installed builder, verify these behaviors in the target deployment:

- A new session exposes shell and file tools on its Final computer without requiring a Device.
- A Goal that one published agent clearly fits is handed to that agent without a choice card; the card appears only when no agent fits, several fit, or a stated preference is unmet.
- A request to prepare a change for review produces a concrete diff and check results before any push or publication.
- An upstream sync preserves downstream commits and customizations, uses a normal push, and reports both source and resulting commit SHAs.
- An already synchronized and published agent produces an accurate no-change result without a new revision.
- Missing repository or publication access produces a specific blocker; a successful Git operation is never reported as successful publication.
- An authorized publication returns a revision for the verified commit, and an isolated startup check verifies the affected capabilities.

## License

Licensed under the [Apache License, Version 2.0](LICENSE).

Copyright 2026 Final, Inc. See [NOTICE](NOTICE). Configuration and attribution conventions are adapted from the Apache-2.0-licensed [Final Home template](https://github.com/final-company/agent-templates-home).
