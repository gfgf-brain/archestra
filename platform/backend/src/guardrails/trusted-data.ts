import { logger } from '../logger';
import type { ToolResultUpdate } from '../types';

interface TrustedDataContext {
  considerContextUntrusted: boolean;
  toolResultPolicies: Map<string, string>;
}

/**
 * Evaluates tool result policies and applies blocking/redaction rules.
 * This function must execute regardless of initial context trust status
 * to ensure Tool Result Policies are properly enforced.
 */
export async function evaluateIfContextIsTrusted(
  context: TrustedDataContext
): Promise<ToolResultUpdate[]> {
  const toolResultUpdates: ToolResultUpdate[] = [];

  // Always evaluate tool result policies, even if context is marked as untrusted
  // from the start. The early return for considerContextUntrusted should only
  // affect trust-based decisions, not policy enforcement.
  
  if (context.toolResultPolicies && context.toolResultPolicies.size > 0) {
    for (const [toolName, policy] of context.toolResultPolicies.entries()) {
      if (policy === 'Blocked') {
        toolResultUpdates.push({
          toolName,
          action: 'block',
          reason: 'Tool Result Policy set to Blocked'
        });
      }
    }
  }

  // Early return for context trust evaluation only happens AFTER
  // tool result policies have been processed
  if (context.considerContextUntrusted) {
    logger.debug('Context marked as untrusted from start of chat');
    return toolResultUpdates;
  }

  return toolResultUpdates;
}
