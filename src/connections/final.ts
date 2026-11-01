// Copyright 2026 Final, Inc.
// SPDX-License-Identifier: Apache-2.0

import { defineFinalConnection } from '@finalai/agents';

export default defineFinalConnection({
  tools: {
    // Keep bootstrap, exact-message and assigned-Goal reads visible; discover other permitted
    // tools on demand.
    load: [
      'get_tool_guide',
      'read_original_message',
      'get_goal',
      'list_agents',
      'get_agent',
      'get_chat_configuration',
      'propose_chat_change',
    ],
    // Allow exact-message reads; block selection cards, broad cross-chat control, and Goal
    // changes: the agent this chat is handed to works on its Goal.
    deny: [
      'propose_chat_agent_options',
      'create_goal',
      'update_goal',
      'delegate_goal_to_new_chat',
      'delegate_goal_to_chat',
      'withdraw_goal_from_chat',
      'list_conversations',
      'read_conversation',
      'post_to_conversation',
      'create_agent_session',
      'read_agent_session',
    ],
  },
});
