// Copyright 2026 Final, Inc.
// SPDX-License-Identifier: Apache-2.0

import { defineFinalConnection } from '@finalai/agents';

export default defineFinalConnection({
  tools: {
    // Keep bootstrap, exact-message and assigned-Task reads visible; discover other permitted
    // tools on demand.
    load: [
      'get_tool_guide',
      'read_original_message',
      'get_task',
      'list_agents',
      'get_agent',
      'get_chat_configuration',
      'propose_chat_change',
    ],
    // Allow exact-message reads; block selection cards, broad cross-chat control, and Task
    // changes: the agent this chat is handed to works on its Task.
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
});
