// Copyright 2026 Final, Inc.
// SPDX-License-Identifier: Apache-2.0

import { defineAgent, markdown } from '@finalai/agents';
import { FinalHarness } from '@finalai/agents/harnesses';

export const agent = defineAgent({
  name: 'Agent Builder',
  description:
    'Bootstraps Final agents by reusing, forking, or building from scratch, and configures, validates, and publishes them from their Git repositories.',
  instructions: markdown('./instructions.md', { from: import.meta.url }),
  require: {
    harness: {
      permissionMode: 'auto',
      recommended: {
        harness: FinalHarness.ServerlessFinal,
        model: 'deepseek-v4.1-flash-1017',
        reasoning: 'high',
      },
    },
    // Checkouts, edits and checks of agent source.
    compute: { files: 'write', shell: 'execute' },
    integrations: {
      final: {
        description: "Final's tools for this project: agents, chats, Tasks and publishing.",
        tools: {
          // Keep bootstrap, exact-message, assigned-Task and publishing tools visible; discover
          // other permitted tools on demand.
          load: [
            'get_tool_guide',
            'read_original_message',
            'get_task',
            'list_agents',
            'get_agent',
            'publish_agent',
            'get_chat_configuration',
            'propose_chat_change',
          ],
          // Block selection cards, broad cross-chat control, and Task changes: the agent this
          // chat is handed to works on its Task.
          deny: [
            'propose_chat_agent_options',
            'create_task',
            'update_task',
            'delegate_task_to_new_chat',
            'delegate_task_to_chat',
            'withdraw_task_from_chat',
            'list_conversations',
            'read_conversation',
            'post_to_conversation',
            'create_agent_session',
            'read_agent_session',
          ],
        },
      },
    },
  },
});
