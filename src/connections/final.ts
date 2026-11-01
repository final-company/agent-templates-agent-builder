// Copyright 2026 Final, Inc.
// SPDX-License-Identifier: Apache-2.0

import { defineFinalConnection } from '@finalai/agents';

export default defineFinalConnection({
  tools: {
    // Keep bootstrap, exact-message reads, and the assigned Goal's tools visible; discover other
    // permitted tools on demand.
    load: [
      'get_tool_guide',
      'read_original_message',
      'get_goal',
      'update_goal',
      'list_agents',
      'get_agent',
      'get_chat_configuration',
      'propose_chat_change',
    ],
    // Allow exact-message reads; block selection cards and broad cross-chat control.
    deny: [
      'propose_chat_agent_options',
      'list_conversations',
      'read_conversation',
      'post_to_conversation',
      'create_agent_session',
      'read_agent_session',
    ],
  },
});
