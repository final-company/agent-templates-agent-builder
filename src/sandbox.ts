// Copyright 2026 Final, Inc.
// SPDX-License-Identifier: Apache-2.0

import { computer as computerEnvironment } from '@finalai/agents/sandboxes';

// Resolve the organization's default computer with a workspace scoped to this session.
export const computer = computerEnvironment({ workspace: 'session' });
