// Copyright 2026 Final, Inc.
// SPDX-License-Identifier: Apache-2.0

import { baseTools, credentials, defineAgent } from '@finalai/agents';
import { serverlessFinal } from '@finalai/agents/harnesses';
import { computer } from './sandbox.js';

export default defineAgent({
  name: 'Agent Builder',
  description:
    'Chooses or builds the right agent for a Goal, and builds, configures, validates, and publishes agents from their Git repositories.',
  tools: baseTools({ files: computer, shell: computer }),
  harness: serverlessFinal({
    credentials: credentials.chain({
      payer: 'organization',
      tryInOrder: [credentials.platform()],
    }),
    model: 'deepseek-v4.1-flash',
    reasoning: 'high',
    permissionMode: 'auto',
  }),
});
